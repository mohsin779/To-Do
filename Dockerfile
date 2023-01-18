FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install
COPY . ./



# EXPOSE 8085

CMD [ "yarn", "start" ]
# CMD [ "nodemon","app.js" ]
# CMD [ "yarn","dev" ]
