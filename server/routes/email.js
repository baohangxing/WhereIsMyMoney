const Router = require('koa-router'),
	email = require('../controllers/email.js');
const router = new Router();
router.post('/sendCaptcha', email.sendCaptcha);

module.exports = router.routes();
