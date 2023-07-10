variable "vpc_cidr" {
  type = string
}

variable "environment" {
  type = string
}

variable "aws_az1" {
  type = string
}

variable "aws_az2" {
  type = string
}

variable "app_port" {
  type = string
}

variable "instance_class" {
  type = string
  default = "db.t3.medium"
  description = "the AWS RDS Instance Types"
}