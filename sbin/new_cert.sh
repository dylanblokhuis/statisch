DOMAIN_NAME=$1
DOCUMENT_ROOT=$2
WITH_WWW=$3

if $WITH_WWW == "yes"; then
  sudo certbot --non-interactive --nginx --agree-tos --redirect --uir --hsts --staple-ocsp --must-staple --domains ${DOMAIN_NAME} --domains www.${DOMAIN_NAME} --expand
else
  sudo certbot --non-interactive --nginx --agree-tos --redirect --uir --hsts --staple-ocsp --must-staple --domains ${DOMAIN_NAME} --expand
fi

sudo systemctl restart nginx
