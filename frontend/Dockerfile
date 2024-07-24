FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "start", "dev", "--", "--host", "0.0.0.0"]