#!/bin/bash

DOCUMENT_ROOT=$1
VHOST_ROOT=$2
NGINX_PATH=$3
DOMAIN_NAME=$4

sudo rm -rf $DOCUMENT_ROOT
sudo rm $VHOST_ROOT
sudo rm "${NGINX_PATH}/sites-enabled/${DOMAIN_NAME}"
sudo systemctl restart nginx

exit 0;