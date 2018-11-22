const Router = require('koa-router');
const router = new Router();
const authCtrl = require('../controllers/AuthController');

require('dotenv').config();

router.post(process.env.BASE_URL + 'register', authCtrl.register);
router.post(process.env.BASE_URL + 'login', authCtrl.login);
router.post(process.env.BASE_URL + 'refresh-token', authCtrl.refreshToken);
router.get(process.env.BASE_URL + 'me', authCtrl.getUserFromToken);

module.exports = router;