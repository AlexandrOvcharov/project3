FROM nginx
COPY . /usr/share/nginx/html
COPY .*.js /usr/share/nginx/html
COPY .*.html /usr/share/nginx/html
COPY .*.css /usr/share/nginx/html
COPY .*.png /usr/share/nginx/html
EXPOSE 80/tcp
