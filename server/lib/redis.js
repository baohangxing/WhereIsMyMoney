const Redis = require('ioredis');
const CONFIG = require('../config/config');

const redis = {
	port: 6379,          // Redis port
	host: CONFIG.host,   // Redis host
	prefix: 'sam:', //存诸前缀
	ttl: 60 * 60,  //过期时间
	family: 4,
	db: 0
};
const newRedis = new Redis(redis);
module.exports = newRedis;
