const router = require('koa-router')(),
	email = require('../controllers/email.js');

router.post('/api/email/sendCaptcha', email.sendCaptcha);

module.exports = router;
