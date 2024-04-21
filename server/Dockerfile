FROM node:alpine

WORKDIR '/app/server'

COPY package.json .

RUN npm install

COPY .env .

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]