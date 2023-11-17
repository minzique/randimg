FROM node:lts-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app
COPY src/package.json src/package-lock.json ./
RUN npm install --production
COPY src/ ./
EXPOSE 8080

CMD [ "yarn", "start"]