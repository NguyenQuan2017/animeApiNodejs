const Router = require('koa-router');
const router = new Router();
const mangaCtrl = require('../controllers/MangaController');
require('dotenv').config();

router.get(process.env.BASE_URL + 'manga', mangaCtrl.getListManga);
router.post(process.env.BASE_URL + 'manga', mangaCtrl.createManga);
router.get(process.env.BASE_URL + 'manga/:manga_id', mangaCtrl.showUpdateManga);
router.put(process.env.BASE_URL + 'manga/:manga_id', mangaCtrl.updateManga);
router.delete(process.env.BASE_URL + 'manga/:manga_id', mangaCtrl.destroyManga);

module.exports = router;