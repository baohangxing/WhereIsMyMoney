const UserTypeModel = require('../lib/sequelize.js').UserTypeModel;

class UserTypeController {

    /**
     * @api {post} /api/userType/add 新增自定义账单类型
     * @apiDescription 新增自定义账单类型
     * @apiName add
     * @apiGroup UserType
     * @apiParam {string} userId 创建类型的用户的Id
     * @apiParam {string} name 类型名字
     * @apiParam {string} type 账单的类型 0支出 1收入
     * @apiParam {string} icon icon值
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": {
     *     "deleteFlag": 0,
     *     "userId": 11111,
     *     "id": 1,
     *     "name": "加气油",
     *     "type": "0",
     *     "icon": "e777"
     *   },
     *   "msg": "新增成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/userType/add
     * @apiVersion 1.0.0
     */
    static async add(ctx) {
        const data = ctx.request.body;
        if (!data.name || !data.type || !data.icon || !data.userId) {
            return ctx.sendError('000002', '参数不合法');
        }
        const result = await UserTypeModel.create({
            userId: data.userId,
            name: data.name,
            type: data.type,
            icon: data.icon
        });
        return result !== null ? ctx.send(result, '新增成功') : ctx.sendError('000002', '新增失败');
    }

    /**
     * @api {delete} /api/userType/delete 删除自定义账单类型
     * @apiDescription 删除自定义账单类型
     * @apiName delete
     * @apiGroup UserType
     * @apiParam {string} userId 创建类型的用户的Id
     * @apiParam {string} id 账单类型id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code": "000001",
     *      "data": null,
     *      "msg": "删除成功"
     *  }
     * @apiSampleRequest http://localhost:3000/api/userType/delete
     * @apiVersion 1.0.0
     */
    static async delete(ctx) {
        const data = ctx.request.body;
        if (!data.id || !data.userId) {
            return ctx.sendError('000002', '参数不合法');
        }
        let update = {
            deleteFlag: 1
        };
        const result = await UserTypeModel.update(update, {
            where: {
                id: data.id,
                userId: data.userId
            }
        });
        return result !== null ? ctx.send(null, '删除成功') : ctx.sendError('000002', '删除失败');
    }


    /**
     * @api {put} /api/userType/update 修改自定义账单类型
     * @apiDescription 修改账单类型
     * @apiName update
     * @apiGroup UserType
     * @apiParam {string} id 账单id
     * @apiParam {string} userId 创建类型的用户的Id
     * @apiParam {string} name 类型名字 (可选)
     * @apiParam {string} type 账单的类型 0支出 1收入 (可选)
     * @apiParam {string} icon icon值 (可选)
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": {
     *     "id": 2,
     *     "userId": 11111,
     *     "name": "加油 修改后",
     *     "type": 0,
     *     "icon": "e77d",
     *     "deleteFlag": 0
     *   },
     *   "msg": "修改成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/userType/update
     * @apiVersion 1.0.0
     */
    static async update(ctx) {
        const data = ctx.request.body;
        if (!data.id || !data.userId) {
            return ctx.sendError('000002', '参数不合法');
        }
        let update = {};
        if (data.name) update.name = data.name;
        if (data.type) update.type = data.type;
        if (data.icon) update.icon = data.icon;
        const result = await UserTypeModel.update(update, {
            where: {
                id: data.id,
                userId: data.userId
            }
        });
        const afterUpdate = await UserTypeModel.findOne({
            where: {
                id: data.id,
                userId: data.userId
            }
        });
        return result !== null ? ctx.send(afterUpdate, '修改成功') : ctx.sendError('000002', '修改失败');
    }

    /**
     * @api {get} /api/userType/getAll 获取获取自定义账单类型信息
     * @apiDescription 获取获取自定义账单类型信息
     * @apiName getAll
     * @apiGroup UserType
     * @apiParam {string} userId 创建类型的用户的Id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": [
     *     {
     *       "id": 2,
     *       "userId": 11111,
     *       "name": "网购",
     *       "type": 0,
     *       "icon": "e77d",
     *       "deleteFlag": 0
     *     },
     *     {
     *       "id": 3,
     *       "userId": 11111,
     *       "name": "加油",
     *       "type": 0,
     *       "icon": "e777",
     *       "deleteFlag": 0
     *     }
     *   ],
     *   "msg": "请求成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/userType/getAll
     * @apiVersion 1.0.0
     */
    static async getAll(ctx) {
        const data = ctx.query;
        if (!data.userId) {
            return ctx.sendError('000002', '参数不合法');
        }
        const types = await UserTypeModel.findAll({
            where: {
                deleteFlag: 0,
                userId: data.userId
            },
        });
        return types ? ctx.send(types) : ctx.sendError('000002', '未获取到账单类型信息');
    }

    /**
     * @api {get} /api/userType/get 获取单个自定义账单类型信息
     * @apiDescription 获取单个自定义账单类型信息
     * @apiName get
     * @apiGroup UserType
     * @apiParam {string} id 自定义账单类型id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *{
     *   "code": "000001",
     *   "data": {
     *     "id": 2,
     *     "userId": 11111,
     *     "name": "网购",
     *     "type": 0,
     *     "icon": "e77d",
     *     "deleteFlag": 0
     *   },
     *   "msg": "请求成功"
     * }
     * @apiSampleRequest http://localhost:3000/api/userType/get
     * @apiVersion 1.0.0
     */
    static async get(ctx) {
        const data = ctx.query;

        if (!data.id) {
            return ctx.sendError('000002', '参数不合法');
        }
        const type = await UserTypeModel.findOne({
            where: {
                id: data.id,
                deleteFlag: 0
            }
        });

        return type ? ctx.send(type) : ctx.sendError('000002', '未获取到账单类型信息');
    }

}

module.exports = UserTypeController;
