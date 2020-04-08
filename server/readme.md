run:

apidoc -i controllers/ -o public/apidoc/

重启

cd usr/local/BHX/WhereIsMyMoney/server/

pm2 restart ./bin/www
