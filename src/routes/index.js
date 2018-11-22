const Router = require('koa-router');
const router = new Router();
const Ctrl = require('../controllers/Controller');
require('dotenv').config();

router.get('/', async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    }
});


module.exports = router;