FROM node:lts-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app
COPY package.json ./
RUN yarn install --production
COPY src/ ./
EXPOSE 8080

CMD [ "yarn", "start"]