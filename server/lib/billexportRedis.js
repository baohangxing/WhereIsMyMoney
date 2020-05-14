const CodeRedis = require('ioredis');
const CONFIG = require('../config/config');

//账单导出redis，五分钟可导出一次
const redis = {
	port: 6379,          // CodeRedis port
	host: CONFIG.host,   // CodeRedis host
	prefix: 'sam:', //存诸前缀
	ttl: 60 * 5,  //过期时间
	family: 4,
	db: 2
};
const newRedis = new CodeRedis(redis);
module.exports = newRedis;
