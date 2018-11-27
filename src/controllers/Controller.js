require('dotenv').config();
const User = require('../Models/UserModel');
const Category = require('../Models/Category');
const Manga = require('../Models/Manga');
const Chapter = require('../Models/Chapter');
const Genre = require('../Models/Genre');

async function countDataOfTable(ctx) {
    const user = await User.countUser();
    const category = await Category.countCategory();
    const manga = await Manga.countManga();
    const chapter = await Chapter.countChapter();
    const genre = await Genre.countGenre();
    ctx.body = {
        data: [user, category, manga, chapter, genre],
    }
}

module.exports = {
    countDataOfTable
};