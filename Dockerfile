FROM node:6-alpine

ARG APP_DIR=/usr/local/delivery

RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json webpack.config.js ${APP_DIR}/
COPY public ${APP_DIR}/public
COPY server ${APP_DIR}/server
COPY src ${APP_DIR}/src

RUN npm install && npm run build

EXPOSE 3000

CMD ["npm", "start"]
