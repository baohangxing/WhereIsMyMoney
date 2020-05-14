const mailTransport = require("../lib/mailTransport");
const CONFIG = require('./../config/config');
const redis = require("../lib/codeRedis");
const getCaptchaCode = require("./../middlewares/help").getCaptchaCode;
const BillModel = require('../lib/sequelize.js').BillModel;
const Excel = require('exceljs');
const DefaultTypeModel = require('../lib/sequelize.js').DefaultTypeModel;
const UserTypeModel = require('../lib/sequelize.js').UserTypeModel;
const sequelize = require('sequelize');

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
		console.log(data.email);
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
		if (msg !== null) {
			redis.set(data.email, code);
			return ctx.send(null, '发送成功,请注意查收');
		} else {
			return ctx.sendError('000003', '验证码发送错误');
		}
	}

	/**
	 * @api {post} /api/email/sendBillData 发送导出账单数据
	 * @apiDescription 发送导出账单数据
	 * @apiName sendBillData
	 * @apiGroup Email
	 * @apiParam {string} email 用户邮箱
	 * @apiParam {string} userId 用户id
	 * @apiParam {string} exportType 导出格式（默认为excel）
	 * @apiParam {string} startTime 开始时间（默认为全部）
	 * @apiParam {string} endTime 结束时间（默认为全部）
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": null,
	 *   "msg": "发送成功,请注意查收"
	 * }
	 * @apiSampleRequest http://localhost:3000/api/email/sendBillData
	 * @apiVersion 1.0.0
	 */
	static async sendBillData(ctx) {
		const data = ctx.request.body;
		if (!data.email || !data.userId) {
			return ctx.sendError('000002', '参数不合法');
		}
		const workbook = new Excel.Workbook();
		workbook.creator = 'where is my money';
		workbook.created = new Date();
		let sheet = workbook.addWorksheet('账单数据');

		let where = {
			userId: data.userId,
			deleteFlag: 0
		};

		if (data.startTime && data.endTime) {
			let startTime = new Date(data.startTime);
			let endTime = new Date(data.endTime);
			where.time = {
				[sequelize.Op.gte]: startTime,
				[sequelize.Op.lt]: endTime,
			};
		}
		let BillList = await BillModel.findAll({
			attributes: {exclude: ['deleteFlag']},
			where: where
		});
		let typeList = {};
		const dfTypeList = await DefaultTypeModel.findAll({
			attributes: {exclude: ['deleteFlag']},
			where: {
				deleteFlag: 0
			},
		});
		dfTypeList.forEach(item => {
			typeList["dt-" + item.id] = item.name;
		});
		const userTypeList = await UserTypeModel.findAll({
			attributes: {exclude: ['deleteFlag']},
			where: {
				deleteFlag: 0,
				userId: data.userId
			},
		});
		userTypeList.forEach(item => {
			typeList["ut-" + item.id] = item.name;
		});

		sheet.columns = [
			{header: '单号', key: 'id', width: 8},
			{header: '创建日期', key: 'createdTime', width: 20},
			{header: '金额', key: 'amount', width: 15},
			{header: '类别', key: 'useType', width: 15},
			{header: '类型', key: 'type', width: 15},
			{header: '描述', key: 'description', width: 150},
		];
		let list = [];
		BillList.forEach(item => {
			list.push(
				{
					'id': item.id,
					'createdTime': item.createdTime,
					'amount': item.amount,
					'useType': item.defaultType === 0 ? typeList["ut-" + item.typeId] : typeList["dt-" + item.typeId],
					'type': item.type === 0 ? '支出' : '收入',
					'description': item.description
				});
		});
		sheet.addRows(list);

		await workbook.xlsx.writeFile('attachement/账单数据.xlsx').then(async () => {
		}, function (err) {
			console.log(err);
		});

		let options = {
			from: 'WhereIsMyMoney<' + CONFIG.emailUser + '>',
			to: '<' + data.email + '>',
			subject: '账单数据导出成功',
			html: `<h3>您好，这里是 WhereIsMyMoney！</h3>
		<p>这是一封来自WhereIsMyMoney的邮件，首先感谢您使用WhereIsMyMoney，你的账单数据已经成功导出，请查看附件。</p>`,
			attachments: [
				{
					filename: '账单数据.xlsx',
					path: "attachement/账单数据.xlsx"
				}
			]
		};
		let msg = await mailTransport.sendMail(options, function (err, msg) {
			return msg;
		});
		if (msg !== null) {
			return ctx.send(null, '发送成功,请注意查收');
		} else {
			return ctx.sendError('000003', '发送错误');
		}
	}
}

module.exports = EmailController;
