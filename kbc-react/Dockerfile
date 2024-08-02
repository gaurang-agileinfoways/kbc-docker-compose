FROM node:current
WORKDIR /usr/src/app/

COPY kbc-react/package*.json /usr/src/app/

RUN npm install

COPY kbc-react/. .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]