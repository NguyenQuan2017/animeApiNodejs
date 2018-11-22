require('dotenv').config();
const knex = require('../dbs/db').knex;
const bookshelf = require('../dbs/db').bookshelf;
const User = require('./UserModel');
const Manga = require('./Manga');

var FileModel = bookshelf.Model.extend({
    tableName: 'files',
    hasTimestamps: true,
    idAttribute: 'file_id',
    user: function () {
        return this.belongsTo(User.User,'user_id', 'user_id');
    },
    manga: function () {
        return this.belongsTo(Manga.Manga, 'manga_id','manga_id')
    }
});

function saveFile(info) {
    return new FileModel(info).save();
}

function getFileByUser(user_id, file_id) {
    let files = FileModel.query({
        where:{user_id: user_id, file_id: file_id}
    }).fetch();
    return files;
}

function getFileByManga(manga_id, file_id) {
 return  FileModel.where({manga_id:manga_id, file_id: file_id})
        .fetch();
}

function updateFile(file_id, data) {
    let files = data.files;
    let user_id = data.user_id;
    let infoFile = {};
      JSON.parse(files).forEach(item => {
          infoFile = {
              name: item.name,
              mimeType: item.mimeType,
              size: item.size,
              slug: item.slug,
              path: item.path,
              user_id: user_id
          };
      });

    return FileModel.where({file_id: file_id}).fetch().then(function (file) {
        if (file !== null) {
            return file.save(infoFile, {patch: true, method: 'update'}).then(function(dataSave) {
                return dataSave.attributes;
            })
        }
        else {
            return null;
        }
    });
}

module.exports = {
    FileModel,
    saveFile,
    getFileByUser,
    updateFile,
    getFileByManga
};