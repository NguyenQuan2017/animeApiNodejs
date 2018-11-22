require('dotenv').config();
const knex = require('../dbs/db').knex;
const bookshelf = require('../dbs/db').bookshelf;
const slugify = require('slugify');

var File = bookshelf.Model.extend({
    tableName: 'files',
    hasTimestamps: true,
    idAttribute: 'file_id',
});

var Manga = bookshelf.Model.extend({
    tableName: 'mangas',
    hasTimestamps: true,
    idAttribute: 'manga_id',
});

var Chapter = bookshelf.Model.extend({
    tableName: 'chapters',
    hasTimestamps: true,
    idAttribute: 'chapter_id',
    manga: function () {
        return this.belongsTo(Manga, 'manga_id','manga_id').query(function(q) {
            q.column('manga_id','manga_name')
        })
    },

    files: function () {
        return this.belongsToMany(File, 'chapter_files', 'chapter_id','file_id','chapter_id','file_id')
    }
});

function getListChapter() {
    return Chapter.query(function (q) {
        q.orderBy('chapter_id', 'DESC');
    }).fetchPage({
        page: 1,
        withRelated: ['manga','files']
    })
}

function createChapter(body) {
 let manga_ids = body.chapter.selectedManga;
 var manga_id = '';
 manga_ids.forEach(item => {
    manga_id = item.manga_id;
 });
 var chapters = {
     chapter: body.chapter.chapter,
     manga_id: manga_id
 };

 return new Chapter(chapters).save();

}

function getFileChapterMangaByChapterIdMangaId(manga_id, chapter_id) {
    return Chapter.query(function(q) {
        q.where({chapter_id: chapter_id, manga_id:manga_id})
    }).fetch({withRelated: ['files','manga']});

}

module.exports = {
    Chapter,
    getListChapter,
    createChapter,
    getFileChapterMangaByChapterIdMangaId
};