const Router = require('koa-router');
const router = new Router();
const userController = require('../controllers/UserController');
require('dotenv').config();

router.get(process.env.BASE_URL + 'user', userController.getAllUser);
router.get(process.env.BASE_URL + 'user/latest', userController.getUserLatest);
router.get(process.env.BASE_URL + 'user/:user_id', userController.showUserUpdate);
router.put(process.env.BASE_URL + 'user/:user_id', userController.updateUser);
router.delete(process.env.BASE_URL + 'user/:user_id', userController.destroyUser);

module.exports = router;