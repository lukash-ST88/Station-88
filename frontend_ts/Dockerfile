FROM node:20.8.0 as Front

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/

RUN npm install --silent

COPY . .

RUN npm run build

CMD npm start





