const Manga = require('../Models/Manga');
const Category = require('../Models/Category');
const Chapter = require('../Models/Chapter');

async function getLatestManga(ctx) {
    let mangas = await Manga.getLatestManga();
    if (mangas) {
        ctx.body = {
            status: 'ok',
            data: mangas
        }
    }
}

async function getMangaByCategoryId(ctx) {
    let category_id = ctx.params.category_id;
    let mangas = await Manga.getMangaByCategoryId(category_id);
    if (mangas) {
        return ctx.body = {
            status: 'ok',
            data: mangas
        }
    }
}

async function getNameCategoryById(ctx) {
    let category_id = ctx.params.category_id;
    let categoryName = await Category.getNameCategoryById(category_id);
    if (categoryName) {
        return ctx.body = {
            status: 'ok',
            data: categoryName
        }
    }
}

async function getMangaByGenreId(ctx) {
    let genre_id = ctx.params.genre_id;
    let mangas = await Manga.getMangaByGenreId(genre_id);
    if (mangas) {
        return ctx.body = {
            status: 'ok',
            data: mangas
        }
    }
}

async function getContentMangaByMangaId(ctx) {
    let manga_id = ctx.params.manga_id;
    let contentManga = await Manga.getContentMangaByMangaId(manga_id);
    if (contentManga) {
        return ctx.body = {
            status: 'ok',
            data: contentManga
        }
    }
}

async function getFileChapterManga(ctx) {
    let manga_id = ctx.params.manga_id;
    let chapter_id = ctx.params.chapter_id;
    let files = await Chapter.getFileChapterMangaByChapterIdMangaId(manga_id,chapter_id);
    if (files) {
        return ctx.body = {
            status: 'ok',
            data: files
        }
    }
}


async function getFirstFileChapterMangaByMangaId(ctx) {
    let manga_id = ctx.params.manga_id;
    let files = await Chapter.getFirstFileChapterMangaByMangaId(manga_id);
    if (files) {
        return ctx.body = {
            status: 'ok',
            data: files
        }
    }
}
module.exports = {
    getLatestManga,
    getMangaByCategoryId,
    getNameCategoryById,
    getContentMangaByMangaId,
    getFileChapterManga,
    getMangaByGenreId,
    getFirstFileChapterMangaByMangaId
};