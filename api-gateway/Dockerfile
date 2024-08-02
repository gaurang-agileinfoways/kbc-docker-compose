FROM node:current
WORKDIR /usr/src/app/

COPY api-gateway/package*.json /usr/src/app/

RUN npm install

COPY api-gateway/. .

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000