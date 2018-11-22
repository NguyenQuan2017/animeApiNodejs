require('dotenv').config();
const User = require('../Models/UserModel');

async function getAllUser(ctx) {
    try {
        let users = await User.getAllUser();
        console.log(users);
        ctx.body = {
            status: 'ok',
            data: users
        }
    }
    catch (e) {
        console.log(e);
    }
}

async function getUserLatest(ctx) {
    let users = await User.getUserLatest();
    ctx.body = {
        status: 'ok',
        data: users
    }
}

async function showUserUpdate(ctx) {
    let user_id = ctx.params.user_id;
    let user = await User.showUserUpdate(user_id);
    if (user) {
        ctx.body = {
            status: 'ok',
            data: user
        }
    }
    else {
        ctx.body = {
            status: 'error',
            message: 'user id not found'
        }
    }
}
async function updateUser(ctx) {
    let user_id = ctx.params.user_id;
    let body = ctx.request.body;
    let user = await User.updateUserById(user_id, body);
    if (user) {
        return ctx.body = {
            status: 'ok',
            data: user,
            message: 'update user success'
        }
    }
    else {
        return ctx.body = {
            status: 'not ok',
            message: 'user not found'
        }
    }
}

async function destroyUser(ctx) {
    let user_id = ctx.params.user_id;

    let user = await User.DestroyUserById(user_id);
    if (user) {
        return ctx.body = {
            status: 'ok',
            message: 'delete user success'
        }
    } else {
        return ctx.body = {
            status: 'error',
            message: 'user id not found'
        }
    }
}


module.exports = {
    getAllUser,
    getUserLatest,
    showUserUpdate,
    updateUser,
    destroyUser
};
