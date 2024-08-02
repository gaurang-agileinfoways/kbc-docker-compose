FROM node:current
WORKDIR /usr/src/app/

COPY user/package*.json /usr/src/app/

RUN npm install

COPY user/. .

RUN npm run build

CMD ["npm", "run", "start:prod"]