require('dotenv').config();
const knex = require('../dbs/db').knex;
const bookshelf = require('../dbs/db').bookshelf;
const slugify = require('slugify');
const Manga = require('./Manga');

var Genre = bookshelf.Model.extend({
    tableName: 'genres',
    hasTimestamps: true,
    idAttribute: ['genre_id'],
    manga: function() {
        return this.belongsToMany(Manga.Manga, 'genre_manga','genre_id','manga_id');
    }
});

    function getListGenres() {
        return Genre.query(function(q) {
            q.orderBy('genre_id','DESC');
            q.column('genre_id','genre_name','slug');
        }).fetchAll();
    }

    function getGenreById(genre_id) {
        return Genre.where({genre_id: genre_id}).fetch()
            .then(function (genre) {
                if (genre) {
                    return genre
                }
                else {
                    return null;
                }
            })
    }

    function createGenre(body) {
        let genres = {
            genre_name: body.genre_name,
            slug: slugify(body.genre_name)
        };

        return new Genre(genres).save().then( genre => {
            if (genre) {
                return genre;
            }
            else {
                return null;
            }
        })
    }

    function showGenreById(genre_id) {
        return Genre.where({ genre_id : genre_id }).fetch()
            .then( genre => {
                if (genre) {
                    return genre
                }
                else {
                    return null;
                }
            })
    }

    function updateGenreById(genre_id, body) {
        let genres = {
            genre_name: body.genre_name,
            slug: slugify(body.genre_name)
        };
        return Genre.where({ genre_id : genre_id }).fetch()
            .then( genre => {
                if (genre) {
                    return genre.save(genres, {patch :true, method: 'update'})
                        .then(saveGenre => {
                            return saveGenre;
                        })
                }
                else {
                    return null;
                }
            })
    }

    function destroyGenre(genre_id) {
        return Genre.where({ genre_id : genre_id }).destroy();
    }

module.exports = {
    Genre,
    getListGenres,
    getGenreById,
    createGenre,
    showGenreById,
    updateGenreById,
    destroyGenre
}