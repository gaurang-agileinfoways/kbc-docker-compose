FROM node:current
WORKDIR /usr/src/app/

COPY questions/package*.json .

RUN npm install

COPY questions/. .

RUN npm run build

CMD ["npm", "run", "start:prod"]