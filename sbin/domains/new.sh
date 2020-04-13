#!/bin/bash

DOCUMENT_ROOT=$1
VHOST_ROOT=$2
NGINX_PATH=$3
DOMAIN_NAME=$4

sudo mkdir -p $DOCUMENT_ROOT

cat << EOF >> "$VHOST_ROOT"
server {
    listen 80;
    listen [::]:80;

    root $DOCUMENT_ROOT;
    index index.html index.htm;

    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    location / {
        try_files $uri $uri/ =404;
        
        location ~* \.(?:html)$ {
            add_header Cache-Control "public, max-age=0, must-revalidate";
        }

        location ~* \.(?:js|css)$ {
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
    }

    location /page-data {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    location /static {
        location ~* \.(?:webp|svg|png|jpe?g|json|woff|woff2|gif|mp3|mp4|mkv|mpeg|ico|ttf|eot|)$ {
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
    }

    location = /sw.js {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    error_page 404 /404.html;
    
    gzip on;
    gzip_disable "MSIE [1-6]\\.(?!.*SV1)";
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_types text/plain text/css application/javascript application/x-javascript text/xml application/xml application/rss+xml text/javascript image/x-icon image/bmp image/svg+xml;
    gzip_vary on;
}
EOF

sudo ln -s $VHOST_ROOT "${NGINX_PATH}/sites-enabled/"
sudo systemctl restart nginx

exit 0;