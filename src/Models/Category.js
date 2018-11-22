require('dotenv').config();
const knex = require('../dbs/db').knex;
const bookshelf = require('../dbs/db').bookshelf;
const slugify = require('slugify');
const Manga = require('./Manga');

var Category = bookshelf.Model.extend({
    tableName: 'categories',
    hasTimestamps: true,
    idAttribute: ['category_id'],
    manga: function() {
        return this.belongsToMany(Manga.Manga, 'category_manga', 'category_id', 'manga_id')
    }
});

    function countCategory() {
        return Category.query(function (q) {
            q.count('category_id as category')
        }).fetch();
    }

    function getAllCategory() {
        return Category.query(function(q) {
            q.orderBy('category_id','DESC')
        }).fetchAll();
    }

    function createCategory(body) {
        let category = {
            category_name: body.category_name,
            slug: slugify(body.category_name)
        };

        return new Category(category).save().then(function(category) {
            if (category) {
                return category
            }
            else {
                return null
            }
        })

    }

    function getCategoryById(category_id) {
        return Category.where({category_id: category_id }).fetch().then(function (category) {
            if (category) {
                return category
            }
            else {
                return null;
            }
        });
    }

    function updateCategoryById(category_id, body) {
        let categories = {
            category_name: body.category_name,
            slug: slugify(body.category_name),
        };

        return Category.where({category_id:category_id}).fetch().then(function(category) {
            if (category) {
                return category.save(categories, {patch: true, method: 'update'}).then(saveCategory => {
                    return saveCategory.attributes;
                })
            }
            else {
                return null;
            }
        })
    }

    function destroyCategoryById(category_id) {
        return Category.where({category_id: category_id}).destroy()
    }

    //Client

    function getNameCategoryById(category_id) {
        return Category.where({category_id: category_id}).query(function(q) {
            q.columns('category_name')
        }).fetch();
    }

module.exports = {
    Category,
    countCategory,
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategoryById,
    destroyCategoryById,
    getNameCategoryById
}