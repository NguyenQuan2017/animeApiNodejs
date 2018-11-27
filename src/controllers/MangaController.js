const Manga = require('../Models/Manga');
const File = require('../Models/File');

async function getListManga(ctx) {
    let mangas = await Manga.getListManga();
    return ctx.body = {
        status: 'ok',
        data: mangas,
        message: 'get manga success'
    }
}

async function createManga(ctx) {
    let body = ctx.request.body;
    let category_ids = [];
    let genre_ids = [];
    let files = body.files;
    let categories = body.manga.selectedCategory;
    let genres = body.manga.selectedGenre;
    categories.forEach(category => {
        category_ids.push(category.category_id);
    });
    genres.forEach(genre => {
        genre_ids.push(genre.genre_id);
    });
    let manga = await Manga.createManga(body);
    if (manga) {
        manga.categories().attach(category_ids);
        manga.genres().attach(genre_ids);
        JSON.parse(files).forEach( function(item) {
            let file = {
                name: item.name,
                mimeType: item.mimeType,
                slug: item.slug,
                size: item.size,
                path: item.path,
                manga_id: manga.attributes.manga_id,
            };
            File.saveFile(file);
        });
        return ctx.body = {
            status: 'ok',
            data: manga,
            message: 'manga was created'
        }
    }
    else {
        return ctx.body = {
            status: 'erro',
            data: manga,
            message: 'manga was not created'
        }
    }
}

async function showUpdateManga(ctx) {
    let manga_id = ctx.params.manga_id;
    let manga = await Manga.showUpdate(manga_id);
    if (manga) {
        return ctx.body = {
            status: 'ok',
            data: manga,
            message: 'get data id ' + manga_id
        }
    } else {
        return ctx.body = {
            status: 'error',
            message: 'manga not found'
        }
    }
}

async function updateManga(ctx) {
    let manga_id = ctx.params.manga_id;
    let body = ctx.request.body;

    let category_ids = [];
    let genre_ids = [];
    let categories = body.selectedCategory;
    let genres = body.selectedGenre;

    categories.forEach(category => {
        category_ids.push(category.category_id);
    });
    genres.forEach(genre => {
        genre_ids.push(genre.genre_id);
    });

    let manga = await Manga.updateManga(manga_id, body);
        console.log(manga);
    if (manga) {
        manga.categories().attach(category_ids);
        manga.genres().attach(genre_ids);

        return ctx.body = {
            status: 'ok',
            data: manga,
            message: 'manga was updated'
        }
    } else {
        return ctx.body = {
            status: 'error',
            message: 'manga not found'
        }
    }
}

async function destroyManga(ctx) {
    let manga_id = ctx.params.manga_id;
    let manga = await Manga.deleteManga(manga_id);
    if (manga) {
        return ctx.body = {
            status: 'ok',
            message: 'delete manga id ' + manga_id
        }
    } else {
        return ctx.body = {
            status: 'error',
            message: 'manga not found'
        }
    }
}

module.exports = {
    getListManga,
    createManga,
    updateManga,
    showUpdateManga,
    destroyManga
}