const Router = require('koa-router');
const router = new Router();
const Ctrl = require('../controllers/Controller');
require('dotenv').config();

router.get(process.env.BASE_URL + 'count', Ctrl.countDataOfTable);

module.exports = router;