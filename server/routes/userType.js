const router = require('koa-router')(),
    type = require('../controllers/userType.js');

router.post('/api/userType/add', type.add);
router.delete('/api/userType/delete', type.delete);
router.get('/api/userType/getAll', type.getAll);
router.get('/api/userType/get', type.get);
router.put('/api/userType/update', type.update);

module.exports = router;
