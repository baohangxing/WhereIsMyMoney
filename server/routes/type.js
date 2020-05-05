const Router = require('koa-router'),
    type = require('../controllers/type.js');
const router = new Router();
router.post('/add', type.add);
router.delete('/delete', type.delete);
router.get('/getAll', type.getAll);
router.get('/get', type.get);
router.put('/update', type.update);

module.exports = router.routes();
