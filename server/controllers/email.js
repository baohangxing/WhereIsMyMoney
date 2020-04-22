const mailTransport = require("../middlewares/mailTransport");
const CONFIG = require('./../config/config');
const redis = require("./../middlewares/redis");
const getCaptchaCode = require("./../middlewares/help").getCaptchaCode;

class EmailController {

	/**
	 * @api {post} /api/email/sendCaptcha 发送验证码
	 * @apiDescription 发送验证码
	 * @apiName sendCaptcha
	 * @apiGroup Email
	 * @apiParam {string} email 用户邮箱
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": null,
	 *   "msg": "发送成功,请注意查收"
	 * }
	 * @apiSampleRequest http://localhost:3000/api/email/sendCaptcha
	 * @apiVersion 1.0.0
	 */
	static async sendCaptcha(ctx) {
		const data = ctx.request.body;
		console.log(data.email)
		if (!data.email || data.email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
			return ctx.sendError('000002', '参数不合法');
		}
		let code = getCaptchaCode();
		let options = {
			from: 'WhereIsMyMoney<' + CONFIG.emailUser + '>',
			to: '<' + data.email + '>',
			subject: '注意查收你的验证码',
			html: `<h3>您好，这里是 WhereIsMyMoney！</h3><p>这是一封来自WhereIsMyMoney的邮件，首先感谢您使用WhereIsMyMoney，您的验证码为：${code}。</p>`,
		};
		let msg = await mailTransport.sendMail(options, function (err, msg) {
			return msg;
		});
		console.log(msg);
		if(msg !== null){
			redis.set(data.email, code);
			return ctx.send(null, '发送成功,请注意查收')
		}else {
			return ctx.sendError('000003', '验证码发送错误');
		}
	}

}

module.exports = EmailController;
