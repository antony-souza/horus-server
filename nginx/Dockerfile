FROM nginx:latest

RUN apt-get update
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
