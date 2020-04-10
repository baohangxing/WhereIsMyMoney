const router = require('koa-router')(),
    bill = require('../controllers/bill.js');

router.post('/api/bill/add', bill.add);
router.delete('/api/bill/delete', bill.delete);
router.get('/api/bill/getPage', bill.getPage);
router.get('/api/bill/get', bill.get);
router.get('/api/bill/getSumInfo', bill.getSumInfo);
router.get('/api/bill/getMonthDetailList', bill.getMonthDetailList);
router.get('/api/bill/getMonthTypeList', bill.getMonthTypeList);
router.put('/api/bill/update', bill.update);

module.exports = router;
