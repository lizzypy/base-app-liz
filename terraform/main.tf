terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.7.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
  shared_credentials_files = ["~/.aws/config"]
  profile = "default"
}

resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = {
    Name = "${var.environment}-vpc"
    Environment = var.environment
  }
}

# Attach an internet gateway to your VPC
# tagging: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/resource-tagging
resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "${var.environment}-igw"
    Environment = var.environment
  }
}

resource "aws_eip" "nat_eip" {
  vpc = true
}
# We connect our internet gateway to our public subnet - If a subnet is associated
# with a route table that does not have a route to an internet gateway it's known as
# a private subnet
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id = aws_subnet.public_az1.id
  depends_on = [aws_internet_gateway.ig]
}

# how do we choose the cidr blocks?
resource "aws_subnet" "public_az1" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = var.aws_az1
  depends_on = [aws_internet_gateway.ig]
}

resource "aws_subnet" "public_az2" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = var.aws_az2

  depends_on = [aws_internet_gateway.ig]
}

# resources deployed in private availability zones are not directly accessible from the internet
resource "aws_subnet" "private_az1" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "10.0.0.0/24"
  availability_zone = var.aws_az1

  depends_on = [aws_internet_gateway.ig]
}

resource "aws_subnet" "private_az2" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = var.aws_az2

  depends_on = [aws_internet_gateway.ig]
}

resource "aws_route_table" "public_az1" {
  vpc_id = aws_vpc.vpc.id
}

# what does the destination being 0.0.0.0/0 mean? Does it mean traffic can go anywhere?
# Is that ok?
resource "aws_route" "public_az1" {
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.ig.id
  route_table_id = aws_route_table.public_az1.id
}

resource "aws_route_table" "public_az2" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_route" "public_az2" {
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.ig.id
  route_table_id = aws_route_table.public_az2.id
}

resource "aws_route_table_association" "public_az1" {
  subnet_id = aws_subnet.public_az1.id
  route_table_id = aws_route_table.public_az1.id
}

resource "aws_route_table_association" "public_az2" {
  subnet_id = aws_subnet.public_az2.id
  route_table_id = aws_route_table.public_az2.id
}

resource "aws_route_table" "private_az1" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_route" "private_az1" {
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id = aws_nat_gateway.nat.id
  route_table_id = aws_route_table.private_az1.id
}

resource "aws_route_table_association" "private_az1" {
  subnet_id = aws_subnet.private_az1.id
  route_table_id = aws_route_table.private_az1.id
}

resource "aws_route_table" "private_az2" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_route" "private_az2" {
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id = aws_nat_gateway.nat.id
  route_table_id = aws_route_table.private_az2.id
}

resource "aws_route_table_association" "private_az2" {
  subnet_id = aws_subnet.private_az2.id
  route_table_id = aws_route_table.private_az2.id
}

resource "aws_security_group" "default" {
  name = "${var.environment}-default-sg"
  description = "Default security group to allow inbound/outbound from the VPC"
  vpc_id = aws_vpc.vpc.id
  depends_on = ["aws_vpc.vpc"]

  tags = {
    Environment = var.environment
  }
}

# for now allow traffic from anywhere to anywhere - while this is probably a bad idea let's do it for now

resource "aws_vpc_security_group_egress_rule" "default_egress" {
  security_group_id = aws_security_group.default.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 0
  ip_protocol = "tcp"
  to_port     = 0
}

resource "aws_vpc_security_group_ingress_rule" "default_ingress" {
  security_group_id = aws_security_group.default.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 0
  ip_protocol = "tcp"
  to_port     = 0
}

# DATABASE STUFF

resource "aws_security_group" "db" {
  vpc_id = aws_vpc.vpc.id
}

# whats a better way to get these subnet ids??
resource "aws_db_subnet_group" "this" {
  subnet_ids = [aws_subnet.public_az1.id, aws_subnet.public_az2.id]
}

resource "aws_db_instance" "this" {
  allocated_storage = 10
  engine = "postgres"
  engine_version = "14"
  instance_class = var.instance_class
  db_name = "production"
  username = "postgres"
  password = "postgres"
  skip_final_snapshot = true
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name = aws_db_subnet_group.this.name
  publicly_accessible = true
}

resource "aws_security_group_rule" "db_ingress" {
  type = "ingress"
  from_port = 5432
  to_port = 5432
  protocol = "tcp"
  security_group_id = aws_security_group.db.id
  cidr_blocks = ["0.0.0.0/0"]
}

output "endpoint" {
  value = "postgresql://${aws_db_instance.this.endpoint}"
}