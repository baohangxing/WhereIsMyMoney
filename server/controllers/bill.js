const BillModel = require('../lib/sequelize.js').BillModel;
const sequelize = require('sequelize');

class BillController {

    /**
     * @api {post} /api/bill/add 新增账单
     * @apiDescription 新增账单
     * @apiName add
     * @apiGroup Bill
     * @apiParam {string} userId 用户id
     * @apiParam {string} type 账单的类型 0支出 1收入
     * @apiParam {string} defaultType 账单的类型是否是官方的类型 0不是 1是
     * @apiParam {string} typeId 账单的类型id
     * @apiParam {string} time 账单时间
     * @apiParam {string} amount 金额
     * @apiParam {string} description 账单描述/备注（可选，128字以下）
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "code": "000001",
     *   "data": {
     *     "createdTime": "2020-03-19T14:27:55.179Z",
     *     "deleteFlag": 0,
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
     * @apiSampleRequest http://localhost:3000/api/bill/add
     * @apiVersion 1.0.0
     */
    static async add(ctx) {
        const data = ctx.request.body;
        if (data.userId == null || data.type == null || data.defaultType == null || data.typeId == null || data.time == null || data.amount == null) {
            return ctx.sendError('000002', '参数不合法');
        }
        const result = await BillModel.create({
            userId: data.userId,
            type: data.type,
            defaultType: data.defaultType,
            typeId: data.typeId,
            time: data.time,
            amount: data.amount,
            description: data.description || ''
        });
        return result !== null ? ctx.send(result, '新增成功') : ctx.sendError('000002', '新增失败');
    }

    /**
     * @api {delete} /api/bill/delete 删除账单
     * @apiDescription 删除账单
     * @apiName delete
     * @apiGroup Bill
     * @apiParam {string} id 账单id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code": "000001",
     *      "data": null,
     *      "msg": "删除成功"
     *  }
     * @apiSampleRequest http://localhost:3000/api/bill/delete
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
        const result = await BillModel.update(update, {
            where: {
                id: data.id
            }
        });
        return result !== null ? ctx.send(null, '删除成功') : ctx.sendError('000002', '删除失败');
    }


    /**
     * @api {put} /api/bill/update 修改账单
     * @apiDescription 修改账单
     * @apiName update
     * @apiGroup Bill
     * @apiParam {string} id 账单id
     * @apiParam {string} type 账单的类型 0支出 1收入（可选）
     * @apiParam {string} defaultType 账单的类型是否是官方的类型 0不是 1是（可选）
     * @apiParam {string} amount 金额（可选）
     * @apiParam {string} typeId 账单的类型id（可选）
     * @apiParam {string} time 账单时间（可选）
     * @apiParam {string} description 账单描述/备注（可选，128字以下）
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code": "000001",
     *      "data": {
     *          "createdTime": "2020-03-19T14:27:55.179Z",
     *          "deleteFlag": 0,
     *          "id": 63,
     *          "userId": "11111",
     *          "type": "0",
     *          "defaultType": "1",
     *          "typeId": "1",
     *          "time": "2020-03-19T14:06:41.000Z",
     *          "amount": "12.44",
     *          "description": "update"
     *       },
     *      "msg": "修改成功"
     *  }
     * @apiSampleRequest http://localhost:3000/api/bill/update
     * @apiVersion 1.0.0
     */
    static async update(ctx) {
        const data = ctx.request.body;
        if (!data.id) {
            return ctx.sendError('000002', '参数不合法');
        }
        let update = {};
        if (data.type != null) {
            update.type = data.type
        }
        if (data.amount != null) {
            update.amount = data.amount
        }
        if (data.defaultType != null) {
            update.defaultType = data.defaultType
        }
        if (data.typeId != null) {
            update.typeId = data.typeId
        }
        if (data.time != null) {
            update.time = data.time
        }
        if (data.description != null) {
            update.description = data.description
        }
        const result = await BillModel.update(update, {
            where: {
                id: data.id,
            }
        });
        const afterUpdate = await BillModel.findOne({
            where: {
                id: data.id,
            }
        });
        return result !== null ? ctx.send(afterUpdate, '修改成功') : ctx.sendError('000002', '修改失败');
    }

    /**
     * @api {get} /api/bill/getPage 获取账单信息
     * @apiDescription 获取账单信息
     * @apiName getPage
     * @apiGroup Bill
     * @apiParam {string} userId 用户userId
     * @apiParam {string} size 分页大小 （不填为10）
     * @apiParam {string} startTime 开始时间 （可选，但需和endTime一起使用）
     * @apiParam {string} endTime 结束时间 （可选, 但需和startTime一起使用）
     * @apiParam {string} current 分页页码 （不填为1）
     * @apiParam {string} type 账单类型 （不填为全部）
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *    "code": "000001",
     *    "data": {
     *      "count": 23,
     *      "rows": [
     *        {
     *          "id": 16,
     *          "userId": 11111,
     *          "type": 1,
     *          "amount": "22.00",
     *          "defaultType": 1,
     *          "typeId": 1,
     *          "time": "2020-03-19T14:14:02.000Z",
     *          "createdTime": "2020-03-19T14:14:02.000Z",
     *          "description": "for test 2222222222",
     *         "deleteFlag": 0
     *       },
     *        {
     *          "id": 17,
     *          "userId": 11111,
     *          "type": 1,
     *          "amount": "22.00",
     *          "defaultType": 1,
     *          "typeId": 1,
     *          "time": "2020-03-19T14:14:02.000Z",
     *          "createdTime": "2020-03-19T14:14:02.000Z",
     *          "description": "for test 2222222222",
     *          "deleteFlag": 0
     *        },
     *        {
     *          "id": 18,
     *          "userId": 11111,
     *          "type": 1,
     *          "amount": "22.00",
     *          "defaultType": 1,
     *          "typeId": 1,
     *          "time": "2020-03-19T14:14:02.000Z",
     *          "createdTime": "2020-03-19T14:14:02.000Z",
     *          "description": "for test 2222222222",
     *          "deleteFlag": 0
     *        }
     *      ],
     *      "size": "3",
     *      "current": "6"
     *    },
     *    "msg": "请求成功"
     *  }
     * @apiSampleRequest http://localhost:3000/api/bill/getPage
     * @apiVersion 1.0.0
     */
    static async getPage(ctx) {
        const data = ctx.query;
        const Op = sequelize.Op;

        if (!data.userId) {
            return ctx.sendError('000002', '参数不合法');
        }

        let where = {
            userId: data.userId,
            deleteFlag: 0
        };
        if (data.type) where.type = data.type;
        let pageSize = Number(data.size) || 10;
        let page = Number(data.current) || 1;

        if (data.startTime && data.endTime) {
            where.createdTime = {
                [Op.gte]: data.startTime,
                [Op.lte]: data.endTime
            }
        }
        const bills = await BillModel.findAndCountAll({
            where: where,
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        bills.size = data.size || 10;
        bills.current = data.current || 1;
        return ctx.send(bills);
    }

    /**
     * @api {get} /api/bill/get 获取单个账单信息
     * @apiDescription 获取单个账单信息
     * @apiName get
     * @apiGroup Bill
     * @apiParam {string} id 账单id
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *    "code": "000001",
     *    "data": {
     *          "id": 16,
     *          "userId": 11111,
     *          "type": 1,
     *          "amount": "22.00",
     *          "defaultType": 1,
     *          "typeId": 1,
     *          "time": "2020-03-19T14:14:02.000Z",
     *          "createdTime": "2020-03-19T14:14:02.000Z",
     *          "description": "for test 2222222222",
     *         "deleteFlag": 0
     *    },
     *    "msg": "请求成功"
     *  }
     * @apiSampleRequest http://localhost:3000/api/bill/get
     * @apiVersion 1.0.0
     */
    static async get(ctx) {
        const data = ctx.query;

        if (!data.id) {
            return ctx.sendError('000002', '参数不合法');
        }
        const bill = await BillModel.findOne({
            where: {
                id: data.id,
                deleteFlag: 0
            }
        });

        return bill ? ctx.send(bill) : ctx.sendError('000002', '未获取到账单信息');
    }

}

module.exports = BillController;
