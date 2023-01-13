FROM node:12.14.1

WORKDIR ./app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8085

CMD [ "yarn", "start" ]