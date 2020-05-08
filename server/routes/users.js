const Router = require('koa-router'),
    User = require('../controllers/user.js');
const router = new Router();
router.post('/register', User.register);
router.post('/login', User.login);
router.post('/resetPassword', User.resetPassword);
router.get('/info', User.userInfo);
router.put('/updateInfo', User.updateInfo);
router.get('/platformUserInfo', User.getPlatformUserInfo);

module.exports = router.routes();
