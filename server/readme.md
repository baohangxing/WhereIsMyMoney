run:

apidoc -i controllers/ -o public/apidoc/

重启

pm2 restart ./bin/www
