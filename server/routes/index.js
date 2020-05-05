const router = require('koa-router')();
const users = require('./users');
const bills = require('./bill');
const types = require('./type');
const email = require('./email');
const userTypes = require('./userType');
const appVersion = require('./appVersion');

router.use('/api/user', users);
router.use('/api/bill', bills);
router.use('/api/type', types);
router.use('/api/email', email);
router.use('/api/userType', userTypes);
router.use('/api/appVersion', appVersion);

module.exports = router;
