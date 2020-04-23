const router = require('koa-router')(),
    User = require('../controllers/user.js');

router.post('/api/user/register', User.register);
router.post('/api/user/login', User.login);
router.post('/api/user/resetPassword', User.resetPassword);
router.get('/api/user/info', User.userInfo);
router.put('/api/user/updateInfo', User.updateInfo);

module.exports = router;
