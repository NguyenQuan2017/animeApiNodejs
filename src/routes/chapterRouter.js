const Router = require('koa-router');
const router = new Router();
const chapterCtrl = require('../controllers/ChapterController');

require('dotenv').config();

router.get(process.env.BASE_URL + 'chapter', chapterCtrl.getListChapter);
router.post(process.env.BASE_URL + 'chapter', chapterCtrl.createChapter);

module.exports = router;