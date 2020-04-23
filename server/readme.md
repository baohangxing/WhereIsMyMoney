### run:

apidoc -i controllers/ -o public/apidoc/

### 重启

cd /usr/local/BHX/WhereIsMyMoney/server/

pm2 start ./bin/www

pm2 restart ./bin/www


### redis

redis-cli.exe -h 127.0.0.1 -p 6379

**Linux** 

cd /usr/local/BHX/redis

./redis-server redis.conf

