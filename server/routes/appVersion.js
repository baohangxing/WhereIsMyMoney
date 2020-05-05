const Router = require('koa-router'),
	system = require('../controllers/appVersion.js');
const router = new Router();
router.post('/add', system.add);
router.delete('/delete', system.delete);
router.get('/getAll', system.getAll);
router.get('/get', system.get);
router.put('/update', system.update);

module.exports = router.routes();
