FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/loutility-cadastro-web-client /usr/share/nginx/html
COPY ./config/nginx.config /etc/ngix/conf.d/default.conf

#docker build -t ioutility-cadastro-client .
#docker run -p 8089:80 ioutility-cadastro-client
