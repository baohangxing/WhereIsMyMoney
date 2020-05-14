const Router = require('koa-router'),
	npl = require('../controllers/NLP');
const router = new Router();
router.post('/addBill', npl.addBill);
module.exports = router.routes();
