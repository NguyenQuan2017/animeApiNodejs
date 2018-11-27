require('dotenv').config();
const Router = require('koa-router');
const router = new Router();
const upload = require('../dbs/db').upload;
const FileCtrl = require('../controllers/FileController');

router.post(process.env.BASE_URL + 'file/upload', upload.array('files', 100), FileCtrl.uploadFile);
router.get(process.env.BASE_URL + 'user/:user_id/file/:file_id', FileCtrl.getFileByUser);
router.put(process.env.BASE_URL + 'file/:file_id', FileCtrl.updateFileAvatar);
router.get(process.env.BASE_URL + 'manga/:manga_id/file/:file_id',FileCtrl.getFileByMangaId);

module.exports = router;