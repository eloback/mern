FROM node:alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/

ENV PORT=3001
ENV DB_KEY=admin:78451278
ENV DB_NAME=ReactMemories

EXPOSE 3001
CMD ["npm", "start"]
