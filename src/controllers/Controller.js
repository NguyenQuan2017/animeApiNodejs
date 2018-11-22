require('dotenv').config();
const User = require('../Models/UserModel');
const Category = require('../Models/Category');

async function countDataOfTable(ctx) {
    const user = await User.countUser();
    const category = await Category.countCategory();
    ctx.body = {
        data: [user, category],
    }
}

module.exports = {
    countDataOfTable
};