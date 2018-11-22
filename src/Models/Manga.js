require('dotenv').config();
const knex = require('../dbs/db').knex;
const bookshelf = require('../dbs/db').bookshelf;
const slugify = require('slugify');
const Genre = require('./Genre');
const Category = require('./Category');
const Chapter = require('./Chapter');
// const File = require('./File');

var File = bookshelf.Model.extend({
    tableName: 'files',
    hasTimestamps: true,
    idAttribute: 'file_id',
});

var Manga = bookshelf.Model.extend({
    tableName: 'mangas',
    hasTimestamps: true,
    idAttribute: 'manga_id',

    file: function () {
        return this.hasOne(File, 'manga_id', 'manga_id')
    },
    genres: function () {
        return this.belongsToMany(Genre.Genre, 'genre_mangas','manga_id','genre_id','manga_id','genre_id')
    },

    categories: function () {
        return this.belongsToMany(Category.Category, 'category_mangas','manga_id','category_id','manga_id','category_id')
    },
    chapters: function () {
        return this.hasMany(Chapter.Chapter, 'manga_id','manga_id')
    }
});

    function getListManga() {
        return Manga.query(function(q) {
            q.orderBy('manga_id', 'DESC');
        }).fetchAll({withRelated: ['categories','genres','file']});
    }

    function createManga(body) {
        let data = {
            manga_name : body.manga.manga_name,
            slug: slugify(body.manga.manga_name),
            content: body.manga.content,
            episode: body.manga.episode,
            view: 0
        };
         return new Manga(data).save();
    }

    function showUpdate(manga_id) {
        return Manga.where({manga_id: manga_id}).fetch({withRelated: ['categories','genres']});
    }

    function updateManga(manga_id, body) {
        let data = {
            manga_name : body.manga_name,
            slug: slugify(body.manga_name),
            content: body.content,
            episode: body.episode,
        };
        return Manga.where({manga_id: manga_id}).fetch()
            .then(manga => {
                manga.categories().detach();
                manga.genres().detach();
                manga.save(data, {method: 'update'})
            })
    }

    function deleteManga(manga_id) {
        return Manga.where({manga_id: manga_id}).destroy();
    }

    // Write api client
    function getLatestManga() {
        return Manga.query(function(q) {
            q.orderBy('updated_at', 'DESC')
        }).fetchAll({withRelated: ['file']})
    }

    function getMangaByCategoryId(category_id) {
        return Manga.orderBy('created_at','DESC')
            .whereHas('categories', function(q) {
            q.where('categories.category_id', category_id)
        }).fetchAll({withRelated: ['file']});
    }

   function getMangaByGenreId(genre_id) {
       return Manga.orderBy('created_at','DESC')
           .whereHas('genres', function(q) {
               q.where('genres.genre_id', genre_id)
           }).fetchAll({withRelated: ['file']});
   }

    function getContentMangaByMangaId(manga_id) {
        return Manga.where({manga_id: manga_id}).fetch({
            withRelated: ['file',{'chapters': function(q){
                q.orderBy('chapter','ASC')
                }}]
        })
    }


module.exports = {
    Manga,
    getListManga,
    createManga,
    updateManga,
    showUpdate,
    deleteManga,
    getLatestManga,
    getMangaByCategoryId,
    getContentMangaByMangaId,
    getMangaByGenreId
}