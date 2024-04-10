FROM node:20 as Front

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

CMD npm start

# FROM nginx:stable-alpine

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx.conf /etc/nginx/conf.d/
# COPY --from=Front /app/build /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
