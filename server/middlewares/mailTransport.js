const nodemailer = require('nodemailer');
const CONFIG = require('../config/config');

const mailTransport = nodemailer.createTransport({
	service: "QQ",
	secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
	auth: {
		user: CONFIG.emailUser,
		pass: CONFIG.emailPass
	},
});
module.exports = mailTransport;

