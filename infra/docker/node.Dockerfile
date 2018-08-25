FROM node:8

ENV HOME /home/node
WORKDIR $HOME/app

COPY ./codebase/package*.json .
RUN npm install

COPY ./codebase/service .
RUN chown -R node:node $HOME/*

USER node

CMD ["npm", "start"]
