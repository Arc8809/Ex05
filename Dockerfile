# using nginx 
FROM nginx:latest

COPY ./src /usr/share/nginx/html

#nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

