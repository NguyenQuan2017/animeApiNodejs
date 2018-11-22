const Category = require('../Models/Category');
const Joi = require('joi');

async function getAllCategory(ctx) {

    let categories = await Category.getAllCategory();
    return ctx.body = {
        status: 'ok',
        data: categories,
    }
}


async function createCategory(ctx) {
    let body = ctx.request.body;
    const schema = Joi.object().keys({
        category_name: Joi.string().required()
    });
    let validation = Joi.validate(body, schema);
    if (!validation.error) {
        let category = await Category.createCategory(body);
        if (category) {
            return ctx.body = {
                status: 'ok',
                data: category,
                message: 'category was created'
            }
        } else {
            return ctx.body = {
                status: 'error',
                message: 'category not created'
            }
        }
    }
    else {
        return ctx.body = {
            status: 'error',
            message: 'category_name is required'
        }
    }

}

async function showUpdateCategory(ctx) {
    let category_id = ctx.params.category_id;

    let category = await Category.getCategoryById(category_id);

    if (category) {
        return ctx.body = {
            status: 'ok',
            data: category,
            message: 'get category success'
        }
    }
    else {
        return ctx.body = {
            status: 'ok',
            message: 'category not found'
        }
    }

}

async function updateCategory(ctx) {
    let category_id = ctx.params.category_id;
    let body = ctx.request.body;

    let category = await Category.updateCategoryById(category_id, body);
    if (category) {
        return ctx.body = {
            status: 'ok',
            data: category,
            message: 'category was updated'
        }
    }
    else {
        return ctx.body = {
            status: 'error',
            message: 'category not found'
        }
    }

}

async function destroyCategory(ctx) {
    let category_id = ctx.params.category_id;
    let category = await Category.destroyCategoryById(category_id);
    if (category) {
        return ctx.body = {
            status: 'ok',
            message: 'category was deleted'
        }
    }
    else {
        return ctx.body = {
            status: 'error',
            message: 'category not found'
        }
    }
}
module.exports = {
    getAllCategory,
    createCategory,
    showUpdateCategory,
    updateCategory,
    destroyCategory
};