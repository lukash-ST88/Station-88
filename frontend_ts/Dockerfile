FROM node:20.8.0 as Front

WORKDIR /app/

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

CMD npm start


