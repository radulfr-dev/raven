FROM node:slim

LABEL maintainer="cameron@theagency.io"

COPY . /src

WORKDIR /src

RUN npm install

RUN npm install -g nodemon

EXPOSE 8080

#ENTRYPOINT ["node", "./main.js"]
CMD npm start
