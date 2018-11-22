const Router = require('koa-router');
const router = new Router();
const CategoryCtrl = require('../controllers/CategoryController');
const GenreCtrl = require('../controllers/GenreController');
const ClientCtrl = require('../controllers/ClientController');
require('dotenv').config();


router.get(process.env.BASE_URL + 'public/category', CategoryCtrl.getAllCategory);
router.get(process.env.BASE_URL + 'public/genre', GenreCtrl.getAllGenre);
router.get(process.env.BASE_URL + 'public/manga/latest', ClientCtrl.getLatestManga);
router.get(process.env.BASE_URL + 'public/category/:category_id/manga', ClientCtrl.getMangaByCategoryId);
router.get(process.env.BASE_URL + 'public/genre/:genre_id/manga', ClientCtrl.getMangaByGenreId);
router.get(process.env.BASE_URL + 'public/category/:category_id/name', ClientCtrl.getNameCategoryById);
router.get(process.env.BASE_URL + 'public/manga/:manga_id/content', ClientCtrl.getContentMangaByMangaId);
router.get(process.env.BASE_URL + 'public/chapter/:chapter_id/manga/:manga_id', ClientCtrl.getFileChapterManga);

module.exports = router;