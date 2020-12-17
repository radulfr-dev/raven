FROM alpine

LABEL maintainer="cameron@theagency.io"

RUN apk add --update nodejs nodejs-npm

COPY . /src

WORKDIR /src

RUN npm install

RUN npm install -g nodemon

EXPOSE 8080

ENTRYPOINT ["nodemon", "./main.js"]
