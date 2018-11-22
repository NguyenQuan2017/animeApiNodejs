require('dotenv').config();
const environment = process.env.ENVIROMENT || 'development';
const config = require('../../knexfile')[environment];
const multer = require('koa-multer');
var storage = multer.memoryStorage();
const knex = require('knex')(config);
var upload = multer({ dest: 'publics/uploads/' });
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-eloquent'));
bookshelf.plugin('pagination');
module.exports = {
    upload,
    knex,
    bookshelf
}

