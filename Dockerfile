FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "ts-node", "./src/index.ts"]

