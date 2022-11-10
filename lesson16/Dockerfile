FROM node:16-alpine


MAINTAINER LP

RUN apk add bash

RUN mkdir /app && chown -R node:node /app

USER node
WORKDIR /app

COPY ./backend/package.json .
RUN npm install




