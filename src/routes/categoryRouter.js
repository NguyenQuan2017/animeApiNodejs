const Router = require('koa-router');
const router = new Router();
const CategoryCtrl = require('../controllers/CategoryController');

require('dotenv').config();

router.get(process.env.BASE_URL + 'category', CategoryCtrl.getAllCategory);
router.post(process.env.BASE_URL + 'category', CategoryCtrl.createCategory);
router.get(process.env.BASE_URL + 'category/:category_id', CategoryCtrl.showUpdateCategory);
router.put(process.env.BASE_URL + 'category/:category_id', CategoryCtrl.updateCategory);
router.delete(process.env.BASE_URL + 'category/:category_id', CategoryCtrl.destroyCategory);
module.exports = router;