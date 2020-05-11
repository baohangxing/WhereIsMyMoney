const AppVersionModel = require('../lib/sequelize.js').AppVersionModel;

class SystemController {

	/**
	 * @api {post} /api/appVersion/add 新增版本说明
	 * @apiDescription 新增版本说明
	 * @apiName add
	 * @apiGroup AppVersion
	 * @apiParam {string} appVersion 版本号 （可选）
	 * @apiParam {string} appDownloadLink 版本下载链接 （可选）
	 * @apiParam {string} title 标题 （可选）
	 * @apiParam {string} updateTip 更新说明（必须，富文本 4000字内）
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": {
	 *   "id": 2,
	 *    "appVersion": "1.0.0",
	 *    "appDownloadLink": "http://www.whereismymoney.icu/apk_link/1.0.0.apk",
	 *    "createdTime": "2020-05-05 15:37:11",
	 *    "updateTip": "测试",
	 *    "title": "测试"
	 *   },
	 *   "msg": "新增成功"
	 * }
	 * @apiSampleRequest http://localhost:3000/api/appVersion/add
	 * @apiVersion 1.0.0
	 */
	static async add(ctx) {
		const data = ctx.request.body;
		if (data.updateTip == null) {
			return ctx.sendError('000002', '参数不合法');
		}
		let addData = await AppVersionModel.create({
			appVersion: data.appVersion,
			appDownloadLink: data.appDownloadLink,
			updateTip: data.updateTip,
			title: data.title
		});
		const result = await AppVersionModel.findOne({
			attributes: {exclude: ['deleteFlag']},
			where: {
				id: addData.id,
			}
		});
		return result !== null ? ctx.send(result, '新增成功') : ctx.sendError('000002', '新增失败');
	}

	/**
	 * @api {delete} /api/appVersion/delete 删除版本信息
	 * @apiDescription 删除版本信息
	 * @apiName delete
	 * @apiGroup AppVersion
	 * @apiParam {string} id 版本id
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *      "code": "000001",
	 *      "data": null,
	 *      "msg": "删除成功",
	 *      "title": "测试"
	 *  }
	 * @apiSampleRequest http://localhost:3000/api/appVersion/delete
	 * @apiVersion 1.0.0
	 */
	static async delete(ctx) {
		const data = ctx.request.body;
		if (!data.id) {
			return ctx.sendError('000002', '参数不合法');
		}
		let update = {
			deleteFlag: 1
		};
		const result = await AppVersionModel.update(update, {
			where: {
				id: data.id
			}
		});
		return result !== null ? ctx.send(null, '删除成功') : ctx.sendError('000002', '删除失败');
	}


	/**
	 * @api {put} /api/appVersion/update 修改版本信息
	 * @apiDescription 修改版本信息
	 * @apiName update
	 * @apiGroup AppVersion
	 * @apiParam {string} appVersion 版本号 （可选）
	 * @apiParam {string} appDownloadLink 版本下载链接 （可选）
	 * @apiParam {string} updateTip 更新说明（可选，富文本 4000字内）
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "code": "000001",
	 *   "data": {
	 *   "id": 2,
	 *    "appVersion": "1.0.1",
	 *    "appDownloadLink": "http://www.whereismymoney.icu/apk_link/1.0.1.apk",
	 *    "createdTime": "2020-05-05 15:45:11",
	 *    "updateTip": "测试修改",
	 *    "title": "测试"
	 *   },
	 *   "msg": "修改成功"
	 * }
	 * @apiSampleRequest http://localhost:3000/api/appVersion/update
	 * @apiVersion 1.0.0
	 */
	static async update(ctx) {
		const data = ctx.request.body;
		if (!data.id) {
			return ctx.sendError('000002', '参数不合法');
		}
		let update = {};
		if (data.appVersion != null) {
			update.appVersion = data.appVersion;
		}
		if (data.appDownloadLink != null) {
			update.appDownloadLink = data.appDownloadLink;
		}
		if (data.updateTip != null) {
			update.updateTip = data.updateTip;
		}
		if (data.title != null) {
			update.title = data.title;
		}
		const result = await AppVersionModel.update(update, {
			where: {
				id: Number(data.id),
			}
		});
		const afterUpdate = await AppVersionModel.findOne({
			attributes: {exclude: ['deleteFlag']},
			where: {
				id: data.id,
			}
		});
		return result !== null ? ctx.send(afterUpdate, '修改成功') : ctx.sendError('000002', '修改失败');
	}

	/**
	 * @api {get} /api/appVersion/getAll 获取所有版本信息
	 * @apiDescription 获取所有版本信息
	 * @apiName getAll
	 * @apiGroup AppVersion
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *    "code": "000001",
	 *    "msg": "请求成功"
	 *    "data": [
	 *      {
	 *        "id": 2,
	 *        "appVersion": "1.0.1",
	 *        "appDownloadLink": "http://www.whereismymoney.icu/apk_link/1.0.1.apk",
	 *        "createdTime": "2020-05-05 15:51:10",
	 *        "updateTip": "测试",
	 *        "title": "测试"
	 *      },
	 *      {
	 *        "id": 3,
	 *        "appVersion": "1.0.2",
	 *        "appDownloadLink": "http://www.whereismymoney.icu/apk_link/1.0.2.apk",
	 *        "createdTime": "2020-05-05 15:51:31",
	 *        "updateTip": "测试222222222",
	 *        "title": "测试"
	 *      }
	 *    ]
	 *  }
	 * @apiSampleRequest http://localhost:3000/api/appVersion/getAll
	 * @apiVersion 1.0.0
	 */
	static async getAll(ctx) {
		const list = await AppVersionModel.findAll({
			attributes: {exclude: ['deleteFlag']},
			where: {
				deleteFlag: 0
			},
		});
		return list ? ctx.send(list) : ctx.sendError('000002', '未获取到版本信息');
	}


	/**
	 * @api {get} /api/appVersion/get 获取单个版本信息
	 * @apiDescription 获取单个版本信息
	 * @apiName get
	 * @apiGroup AppVersion
	 * @apiParam {string} id 版本id
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *    "code": "000001",
	 *    "data": {
	 *        "id": 2,
	 *         "appVersion": "1.0.1",
	 *         "appDownloadLink": "http://www.whereismymoney.icu/apk_link/1.0.1.apk",
	 *         "createdTime": "2020-05-05 15:45:11",
	 *         "updateTip": "测试修改",
	 *         "title": "测试"
	 *    },
	 *    "msg": "请求成功"
	 *  }
	 * @apiSampleRequest http://localhost:3000/api/appVersion/get
	 * @apiVersion 1.0.0
	 */
	static async get(ctx) {
		const data = ctx.query;

		if (!data.id) {
			return ctx.sendError('000002', '参数不合法');
		}
		const appVersion = await AppVersionModel.findOne({
			attributes: {exclude: ['deleteFlag']},
			where: {
				id: data.id,
				deleteFlag: 0
			}
		});

		return appVersion ? ctx.send(appVersion) : ctx.sendError('000002', '未获取到账单信息');
	}

}

module.exports = SystemController;
