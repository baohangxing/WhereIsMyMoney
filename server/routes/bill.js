const Router = require('koa-router'),
	bill = require('../controllers/bill.js');
const router = new Router();
router.post('/add', bill.add);
router.delete('/delete', bill.delete);
router.get('/getPage', bill.getPage);
router.get('/get', bill.get);
router.get('/getSumInfo', bill.getSumInfo);
router.get('/getMonthDetailList', bill.getMonthDetailList);
router.get('/getMonthTypeList', bill.getMonthTypeList);
router.get('/getUserActive', bill.getUserActive);
router.put('/update', bill.updateBill);

module.exports = router.routes();
