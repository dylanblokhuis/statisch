#!/bin/bash

if sudo apt-get -y update; then
    printf "Packages update succeeded.\n"
else
    printf 'Packages update failed.\n'
    exit 1;
fi

if sudo apt install nginx -y; then
    sudo systemctl start nginx
    printf "NGINX install succeeded.\n"
else
    printf 'NGINX install failed.\n'
    exit 1;
fi

sudo apt-get -y update
sudo apt-get -y install software-properties-common
sudo add-apt-repository -y universe
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get -y update
sudo apt-get install -y certbot python-certbot-nginx