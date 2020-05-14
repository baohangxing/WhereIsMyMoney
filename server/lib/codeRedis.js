const CodeRedis = require('ioredis');
const CONFIG = require('../config/config');

//验证码redis，一小时失效
const redis = {
	port: 6379,          // CodeRedis port
	host: CONFIG.host,   // CodeRedis host
	prefix: 'sam:', //存诸前缀
	ttl: 60 * 60,  //过期时间
	family: 4,
	db: 0
};
const newRedis = new CodeRedis(redis);
module.exports = newRedis;
