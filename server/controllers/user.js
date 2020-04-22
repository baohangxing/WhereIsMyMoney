const crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	userModel = require('../lib/sequelize.js').UserModel;
const CONFIG = require('../config/config');
const redis = require("./../middlewares/redis");

class UserController {

	/**
	 * @api {post} /api/user/register 用户注册
	 * @apiDescription 用户注册
	 * @apiName register
	 * @apiGroup User
	 * @apiParam {string} name 用户名
	 * @apiParam {string} password 密码
	 * @apiParam {string} email 邮箱
	 * @apiParam {string} code 验证码
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": {
	 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5L2V6Laz6YGTIiwiaWQiOjExMTE2LCJpYXQiOjE1ODc1NjA5NTIsImV4cCI6MTU5MDE1Mjk1Mn0.Q5SG0IiFB-D1P4XH1vIGWAhu6MBjsSpwLxybwbKva-0",
	 *     "userInfo": {
	 *       "useDays": 1,
	 *       "createdTime": "2020-04-22T13:09:12.669Z",
	 *       "id": 11116,
	 *       "name": "何足道",
	 *       "email": "123456@qq.com"
	 *     }
	 *   },
	 *   "msg": "注册成功"
	 * }
	 * @apiSampleRequest http://localhost:3000/api/user/register
	 * @apiVersion 1.0.0
	 */
	static async register(ctx) {
		const data = ctx.request.body;
		if (!data.name || !data.password || !data.email || !data.code) {
			return ctx.sendError('000002', '参数不合法');
		}
		const emailCode = await redis.get(data.email).then(function (result) {
			return result
		});
		if (emailCode !== data.code) {
			return ctx.sendError('000002', '验证码错误');
		}
		const checkUser = await userModel.findOne({
			attributes: {exclude: ['deleteFlag']},
			where: {
				email: data.email,
			}
		});
		if (checkUser !== null) {
			return ctx.sendError('000002', '该邮箱已经注册过账户');
		}
		const result = await userModel.create({
			name: data.name,
			password: crypto.createHash('md5').update(data.password).digest('hex'),     // 密码加密存储
			email: data.email
		});
		if (result !== null) {
			let userInfo = {
				useDays: result.useDays,
				createdTime: result.createdTime,
				id: result.id,
				name: result.name,
				email: result.email
			};
			const token = jwt.sign({
				name: result.name,
				id: result.id
			}, CONFIG.jwt_secret, {expiresIn: '30d'});
			let data = {
				token: token,
				userInfo: userInfo,
			};
			return ctx.send(data, '注册成功');
		} else {
			ctx.sendError('000002', '注册失败');
		}
	}

	/**
	 * @api {post} /api/user/login 用户登录
	 * @apiDescription 用户登录
	 * @apiName login
	 * @apiGroup User
	 * @apiParam {string} password 密码
	 * @apiParam {string} email 邮箱
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": {
	 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5L2V6Laz6YGTIiwiaWQiOjExMTE2LCJpYXQiOjE1ODc1NjA5NTIsImV4cCI6MTU5MDE1Mjk1Mn0.Q5SG0IiFB-D1P4XH1vIGWAhu6MBjsSpwLxybwbKva-0",
	 *     "userInfo": {
	 *       "useDays": 1,
	 *       "createdTime": "2020-04-22T13:09:12.669Z",
	 *       "id": 11116,
	 *       "name": "何足道",
	 *       "email": "123456@qq.com"
	 *     }
	 *   },
	 *      "msg": "登录成功"
	 *  }
	 * @apiSampleRequest http://localhost:3000/api/user/login
	 * @apiVersion 1.0.0
	 */
	static async login(ctx) {
		const data = ctx.request.body;
		if (!data.password || !data.email) {
			return ctx.sendError('000002', '参数不合法');
		}
		let where = {
			password: crypto.createHash('md5').update(data.password).digest('hex'),
			deleteFlag: 0,
			email: data.email
		};
		const result = await userModel.findOne({
			attributes: {exclude: ['deleteFlag', 'password']},
			where: where
		});
		if (result !== null) {
			const token = jwt.sign({
				name: result.name,
				id: result.id
			}, CONFIG.jwt_secret, {expiresIn: '30d'});
			let data = {
				token: token,
				userInfo: result,
			};
			return ctx.send(data, '登录成功');
		} else {
			return ctx.sendError('000002', '用户名或密码错误');
		}
	}

	/**
	 * @api {PUT} /api/user/updateInfo 修改用户信息
	 * @apiDescription 修改用户信息
	 * @apiName updateInfo
	 * @apiGroup User
	 * @apiParam {string} id 用户id
	 * @apiParam {string} name 用户name
	 * @apiParam {string} email 用户email
	 * @apiParam {string} avatar 用户头像
	 * @apiParam {string} weixinId 用户微信Id
	 * @apiParam {string} qqId 用户QQId
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *        "code": "000001",
	 *        "data": null,
	 *        "msg": "请求成功"
	 *
	 *  }
	 * @apiSampleRequest http://localhost:3000/api/user/updateInfo
	 * @apiVersion 1.0.0
	 */
	static async updateInfo(ctx) {
		const data = ctx.request.body;
		if (!data.id) {
			return ctx.sendError('000002', '参数不合法');
		}
		let update = {};
		if (data.name) {
			let nameUser = await userModel.findOne({
				attributes: {exclude: ['deleteFlag']},
				where: {
					name: data.name,
				}
			});
			if (nameUser) ctx.sendError('000002', '用户名已被注册');
			update.name = data.name
		}
		if (data.email) {
			let nameUser = await userModel.findOne({
				attributes: {exclude: ['deleteFlag']},
				where: {
					email: data.email,
				}
			});
			if (nameUser) ctx.sendError('000002', '邮箱已被注册');
			update.email = data.email
		}
		if (data.avatar) {
			update.avatar = data.avatar
		}
		if (data.weixinId) {
			update.weixinId = data.weixinId
		}
		if (data.qqId) {
			update.qqId = data.qqId
		}
		const result = await userModel.update(update, {
			where: {
				id: data.id,
			}
		});
		return result !== null ? ctx.send(null, '修改成功') : ctx.sendError('000002', '修改失败');
	}

	/**
	 * @api {get} /api/user/info 获取用户信息
	 * @apiDescription 获取用户信息
	 * @apiName info
	 * @apiGroup User
	 * @apiParam {string} id 用户id
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *        "code": "000001",
	 *        "data": {
	 *          "id": 11111,
	 *          "name": "何足道",
	 *          "email": "10000@qq.com",
	 *          "useDays": 1,
	 *          "avatar": "123333333333333.img",
	 *          "weixinId": null,
	 *          "qqId": null
	 *        },
	 *        "msg": "请求成功"
	 *
	 *  }
	 * @apiSampleRequest http://localhost:3000/api/user/userInfo
	 * @apiVersion 1.0.0
	 */
	static async userInfo(ctx) {
		const data = ctx.state.user;
		if (!data.id) {
			return ctx.sendError('000002', '参数不合法');
		}
		const user = await userModel.findOne({
			attributes: {exclude: ['deleteFlag']},
			where: {
				id: data.id,
			}
		});
		if (user !== null) {
			let data = {
				id: user.id,
				name: user.name,
				email: user.email,
				useDays: user.useDays,
				avatar: user.avatar,
				weixinId: user.weixinId,
				qqId: user.qqId
			};
			return ctx.send(data);
		} else {
			return ctx.sendError('000002', '未获取到用户信息');
		}
	}
}

module.exports = UserController;
