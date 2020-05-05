const DefaultTypeModel = require('../lib/sequelize.js').DefaultTypeModel;

class TypeController {

    /**
     * @api {post} /api/type/add 新增账单类型
     * @apiDescription 新增账单类型
     * @apiName add
     * @apiGroup Type
     * @apiParam {string} name 类型名字
     * @apiParam {string} type 账单的类型 0支出 1收入
     * @apiParam {string} icon icon值
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": {
     *     "id": 3,
     *     "name": "加油",
     *     "type": "0",
     *     "icon": "e777"
     *   },
     *   "msg": "新增成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/type/add
     * @apiVersion 1.0.0
     */
    static async add(ctx) {
        const data = ctx.request.body;
        if (!data.name || data.type == null || !data.icon) {
            return ctx.sendError('000002', '参数不合法');
        }
        const result = await DefaultTypeModel.create({
            name: data.name,
            type: data.type,
            icon: data.icon
        });
        return result !== null ? ctx.send(result, '新增成功') : ctx.sendError('000002', '新增失败');
    }

    /**
     * @api {delete} /api/type/delete 删除账单类型
     * @apiDescription 删除账单类型
     * @apiName delete
     * @apiGroup Type
     * @apiParam {string} id 账单类型id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code": "000001",
     *      "data": null,
     *      "msg": "删除成功"
     *  }
     * @apiSampleRequest http://localhost:3000/api/type/delete
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
        const result = await DefaultTypeModel.update(update, {
            where: {
                id: data.id
            }
        });
        return result !== null ? ctx.send(null, '删除成功') : ctx.sendError('000002', '删除失败');
    }


    /**
     * @api {put} /api/type/update 修改账单类型
     * @apiDescription 修改账单类型
     * @apiName update
     * @apiGroup Type
     * @apiParam {string} id 账单id
     * @apiParam {string} name 类型名字 (可选)
     * @apiParam {string} type 账单的类型 0支出 1收入 (可选)
     * @apiParam {string} icon icon值 (可选)
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": {
     *     "id": 2,
     *     "name": "加油 修改后",
     *     "type": 0,
     *     "icon": "e77d"
     *   },
     *   "msg": "修改成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/type/update
     * @apiVersion 1.0.0
     */
    static async update(ctx) {
        const data = ctx.request.body;
        if (!data.id) {
            return ctx.sendError('000002', '参数不合法');
        }
        let update = {};
        if (data.name) {
            update.name = data.name
        }
        if (data.type != null) {
            update.type = data.type
        }
        if (data.icon) {
            update.icon = data.icon
        }
        const result = await DefaultTypeModel.update(update, {
            where: {
                id: data.id,
            }
        });
        const afterUpdate = await DefaultTypeModel.findOne({
            attributes: {exclude: ['deleteFlag']},
            where: {
                id: data.id,
            }
        });
        return result !== null ? ctx.send(afterUpdate, '修改成功') : ctx.sendError('000002', '修改失败');
    }

    /**
     * @api {get} /api/type/getAll 获取账单信息
     * @apiDescription 获取账单信息
     * @apiName getAll
     * @apiGroup Type
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": [
     *     {
     *       "id": 2,
     *       "name": "网购",
     *       "type": 0,
     *       "icon": "e77d",
     *     },
     *     {
     *       "id": 3,
     *       "name": "加油",
     *       "type": 0,
     *       "icon": "e777"
     *     }
     *   ],
     *   "msg": "请求成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/type/getAll
     * @apiVersion 1.0.0
     */
    static async getAll(ctx) {
        const types = await DefaultTypeModel.findAll({
            attributes: {exclude: ['deleteFlag']},
            where: {
                deleteFlag: 0
            },
        });
        return types ? ctx.send(types) : ctx.sendError('000002', '未获取到账单类型信息');
    }

    /**
     * @api {get} /api/bill/get 获取单个账单类型信息
     * @apiDescription 获取单个账单类型信息
     * @apiName get
     * @apiGroup Type
     * @apiParam {string} id 账单类型id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *{
     *   "code": "000001",
     *   "data": {
     *     "id": 2,
     *     "name": "网购",
     *     "type": 0,
     *     "icon": "e77d"
     *   },
     *   "msg": "请求成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/type/get
     * @apiVersion 1.0.0
     */
    static async get(ctx) {
        const data = ctx.query;

        if (!data.id) {
            return ctx.sendError('000002', '参数不合法');
        }
        const type = await DefaultTypeModel.findOne({
            attributes: {exclude: ['deleteFlag']},
            where: {
                id: data.id,
                deleteFlag: 0
            }
        });

        return type ? ctx.send(type) : ctx.sendError('000002', '未获取到账单类型信息');
    }

}

module.exports = TypeController;
