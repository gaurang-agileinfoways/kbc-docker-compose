FROM node:current
WORKDIR /usr/src/app/

COPY quiz/package*.json .

RUN npm install

COPY quiz/. .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]