const knex = require('../dbs/db').knex;
const bookshelf = require('../dbs/db').bookshelf;
const bcrypt = require('bcrypt-nodejs');
const File = require('./File');


var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    idAttribute: 'user_id',
    file: function() {
        return this.hasOne(File.FileModel,'file_id','user_id');
    }
});

    function getAllUser() {
        return User.query(function(q) {
            q.orderBy('user_id','DESC');
        }).fetchAll({withRelated: ['file']});
    }

    function registerUser(body) {
        var salt = bcrypt.genSaltSync(10);
        var files = body.files;
        var user = {
            firstName: body.user.firstName,
            lastName: body.user.lastName,
            userName: body.user.userName,
            email: body.user.email,
            password: bcrypt.hashSync(body.user.password, salt),
        };
        let users = new User(user);
        users.save().then(user => {
            let user_id = user.attributes.user_id;
           if (files !== null) {
               JSON.parse(files).forEach(function(item) {
                   let file = {
                       name: item.name,
                       mimeType: item.mimeType,
                       slug: item.slug,
                       size: item.size,
                       path: item.path,
                       user_id: user_id,
                   };

                   File.saveFile(file)
               })
           }
        });
        return users;
    }

    function userLogin(email) {
        return knex('users')
            .select('user_id','email', 'password','firstName','lastName','userName')
            .where({email: email})
            .limit(1);
    }

    function getUserLatest() {
        return User.query(function (q) {
            q.orderBy('createdAt','DESC')
                .limit(5)
        })
    }

    function countUser() {
        return User.query(function (q) {
            q.count('user_id as user')
        }).fetch();
    }

    function showUserUpdate(user_id) {
        return User.query({
            where:{user_id: user_id}
        }).fetch({withRelated: ['file']})
    }

    function updateUserById(user_id, data) {
        let user = {
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            email: data.email,
            password: data.password,
        };
        return User.where({user_id: user_id}).fetch().then(function(users) {
            if (users) {
                return users.save(user).then(userSave => {
                    return userSave.attributes;
                });
            }
            else {
                return null;
            }
        })
    }

    function DestroyUserById(user_id) {
      return new User({user_id:user_id}).destroy().then(user => {
          if (user) {
              return user;
          }
          else {
              return null;
          }
      })
    }


module.exports = {
    User,
    getAllUser,
    userLogin,
    registerUser,
    getUserLatest,
    countUser,
    showUserUpdate,
    updateUserById,
    DestroyUserById
};