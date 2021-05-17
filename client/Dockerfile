FROM node:alpine

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package*.json /client/

RUN npm install

COPY . /client/

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
