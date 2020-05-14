const CONFIG = require('./../config/config');
const https = require('https');
const qs = require('querystring');
const redis = require("../lib/tokenRedis");
const NLPResultToForms = require("./../middlewares/help").NLPResultToForms;
const DefaultTypeModel = require('../lib/sequelize.js').DefaultTypeModel;
const UserTypeModel = require('../lib/sequelize.js').UserTypeModel;
const BillController = require('./bill');

class NLPController {
	/**
	 * @api {post} /api/NLP/addBill 通过语音文字添加账单
	 * @apiDescription 通过语音文字添加账单
	 * @apiName addBill
	 * @apiGroup NLP
	 * @apiParam {string} text 语音文字
	 * @apiParam {string} userId 用户id
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": {
	 *     "createdTime": "2020-03-19T14:27:55.179Z",
	 *     "id": 63,
	 *     "userId": "11111",
	 *     "type": "0",
	 *     "defaultType": "1",
	 *     "typeId": "1",
	 *     "time": "2020-03-19T14:06:41.000Z",
	 *     "amount": "12.44",
	 *     "description": "for test 3333333"
	 *   },
	 *   "msg": "新增成功"
	 * }
	 * @apiSampleRequest http://localhost:3000/api/NLP/addBill
	 * @apiVersion 1.0.0
	 */
	static async addBill(ctx) {
		const data = ctx.request.body;
		if (!data.text) {
			return ctx.sendError('000002', '参数不合法');
		}
		let token = await redis.get("baidu_NLP_token").then(function (result) {
			return result;
		});
		if (!token) {
			const param = qs.stringify({
				'grant_type': 'client_credentials',
				'client_id': CONFIG.BaiDuNLP_API_Key,
				'client_secret': CONFIG.BaiDuNLPSecret_Key
			});
			token = await https.get(
				{
					hostname: 'aip.baidubce.com',
					path: '/oauth/2.0/token?' + param,
					agent: false
				},
				function (res) {
					res.on('data', (d) => {
						let tk = JSON.parse(d.toString());
						return tk.access_token;
					});
				}
			);
			redis.set("baidu_NLP_token", token);
		}
		console.log(token);
		let NLPHttpRequest = function (text, token) {
			let options = {
				hostname: "aip.baidubce.com",
				path: '/rpc/2.0/nlp/v1/lexer?charset=UTF-8&access_token=' + token,
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
			};
			let data = '';
			return new Promise(function (resolve, reject) {
				let req = https.request(options, function (res) {
					res.setEncoding('utf8');
					res.on('data', function (chunk) {
						data += chunk;
					});
					res.on('end', function () {
						resolve({result: true, data: data});
					});
				});
				req.on('error', (e) => {
					resolve({result: false, errmsg: e.message});
				});
				req.write(JSON.stringify({
					text: text
				}));
				req.end();
			});
		};
		let res = await NLPHttpRequest(data.text, token);
		if (res.result) {
			let typeList = {
				dfTypeList: {},
				userTypeList: {},
				dfTypeListKeys: [],
				userTypeListKeys: []
			};
			const dfTypeList = await DefaultTypeModel.findAll({
				attributes: {exclude: ['deleteFlag']},
				where: {
					deleteFlag: 0
				},
			});
			dfTypeList.forEach(item => {
				typeList.dfTypeListKeys.push(item.name);
				typeList.dfTypeList[item.name] = item.id + "-" + item.type;
			});
			const userTypeList = await UserTypeModel.findAll({
				attributes: {exclude: ['deleteFlag']},
				where: {
					deleteFlag: 0,
					userId: data.userId
				},
			});
			userTypeList.forEach(item => {
				typeList.userTypeListKeys.push(item.name);
				typeList.userTypeList[item.name] = item.id + "-" + item.type;
			});
			let froms = NLPResultToForms(JSON.parse(res.data), typeList);
			if (froms.type === null || froms.defaultType === null ||
				froms.typeId === null || froms.amount === null || froms.time === null) {
				return ctx.sendError('000002', '语音输入提取失败');
			} else {
				froms.description = data.text;
				froms.userId = data.userId;
				console.log(froms);
				ctx.request.body = froms;
				return await BillController.add(ctx);
			}
		} else {
			return ctx.sendError('000002', '自然语言处理失败');
		}
	}


}

module.exports = NLPController;
