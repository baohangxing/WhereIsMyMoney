/**
 * dateFormat
 * @param date
 * @returns {string}
 */
const dateFormat = function (date) {
	let year = date.getFullYear();//年
	if (year < 1900) year = year + 1900;
	let month = date.getMonth() + 1;//月
	if (month < 10) month = '0' + month;
	let day = date.getDate();//日
	if (day < 10) day = '0' + day;
	let hour = date.getHours();//小时
	if (hour < 10) hour = '0' + hour;
	let minute = date.getMinutes();//分钟
	if (minute < 10) minute = '0' + minute;
	let second = date.getSeconds();//秒
	if (second < 10) second = '0' + second;
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
};

/**
 * getCaptchaCode 获取随机生成的验证码
 * @param length  验证码的长度 默认6位
 * @param radix  验证码的进制 默认16
 * @returns {string}  验证码
 */
const getCaptchaCode = function (length = 6, radix = 16) {
	return Math.random().toString(radix).slice(2, length + 2).toUpperCase()
};

module.exports = {
	dateFormat,
	getCaptchaCode
};
