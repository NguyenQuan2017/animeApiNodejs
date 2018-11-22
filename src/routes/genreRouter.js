const Router = require('koa-router');
const router = new Router();
const GenreCtrl = require('../controllers/GenreController');

require('dotenv').config();

router.get(process.env.BASE_URL + 'genre', GenreCtrl.getAllGenre);
router.post(process.env.BASE_URL + 'genre', GenreCtrl.createGenre);
router.get(process.env.BASE_URL + 'genre/:genre_id', GenreCtrl.showGenre);
router.put(process.env.BASE_URL + 'genre/:genre_id', GenreCtrl.updateGenre);
router.delete(process.env.BASE_URL + 'genre/:genre_id', GenreCtrl.destroyGenre);
module.exports = router;
