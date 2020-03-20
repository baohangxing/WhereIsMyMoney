const router = require('koa-router')(),
    type = require('../controllers/type.js');

router.post('/api/type/add', type.add);
router.delete('/api/type/delete', type.delete);
router.get('/api/type/getAll', type.getAll);
router.get('/api/type/get', type.get);
router.put('/api/type/update', type.update);

module.exports = router;
