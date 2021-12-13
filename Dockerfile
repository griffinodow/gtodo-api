FROM alpine:latest
RUN apk add --update nodejs npm
RUN mkdir /srv/g-todo-api
WORKDIR /srv/g-todo-api
COPY package.json .
COPY tsconfig.json .
RUN npm install
RUN npm install -D .
RUN npm install -g typescript
COPY ./src ./src
RUN npm run build
RUN rm -rf ./src; rm tsconfig.json
RUN npm uninstall -D .
RUN npm uninstall -g typescript
RUN apk del npm
ARG NODE_ENV=production
CMD ["node", "./dist/index.js"]
EXPOSE 4000