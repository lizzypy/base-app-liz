FROM node:16.8.0-buster

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

CMD ["./start.sh"]