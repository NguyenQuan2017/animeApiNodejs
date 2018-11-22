const Genre = require('../Models/Genre');
const Joi = require('joi');

async function getAllGenre(ctx) {
    let genres = await Genre.getListGenres();
    return ctx.body = {
        status: 'ok',
        data: genres,
        message: 'get data success'
    }
}

async function createGenre(ctx) {
    let body = ctx.request.body;
    const schema = Joi.object().keys({
        genre_name:Joi.string().required()
    });
    let validation = Joi.validate([body, schema]);
   if (!validation.error) {
       let genre = await Genre.createGenre(body);
       if (genre) {
           return ctx.body = {
               status: 'ok',
               data: genre,
               message: 'genre was created'
           }
       }
       else {
           return ctx.body = {
               status: 'error',
               message: 'genre was not created'
           }
       }
   }
   else {
       return ctx.body = {
           status: 'error',
           message: 'genre is required'
       }
   }
}

async function showGenre(ctx) {
    let genre_id = ctx.params.genre_id;
    let genre = await Genre.showGenreById(genre_id);
    if (genre) {
        return ctx.body = {
            status: 'ok',
            data: genre,
            message: 'get genre id ' + genre_id
        }
    }
    else {
        return ctx.body = {
            status: 'error',
            message: 'genre not found'
        }
    }
}

async function updateGenre(ctx) {
    let genre_id = ctx.params.genre_id;
    let body = ctx.request.body;
    let genre = await Genre.updateGenreById(genre_id, body);
    if (genre) {
        return ctx.body = {
            status: 'ok',
            data: genre,
            message: 'genre was updated'
        }
    } else {
        return ctx.body = {
            status: 'error',
            message: 'genre not found'
        }
    }
}

async function destroyGenre(ctx) {
    let genre_id = ctx.params.genre_id;
    let genre = await Genre.destroyGenre(genre_id);
    if (genre) {
        return ctx.body
    }
}

module.exports = {
    getAllGenre,
    createGenre,
    showGenre,
    updateGenre,
    destroyGenre
};