require('dotenv').config();
const File = require('../Models/File');
const fs = require('fs');
const path = require('path');
const moveFile = require('move-file');
const helpers = require('../helpers/helpers');
const dateformat = require('dateformat');

async function uploadFile(ctx) {
   try {
       const files =ctx.req.files;
       // console.log(files);
       let fileUploads = [];
       for( let file of files) {

            if (file !== null) {
                let name = helpers.getNameFromFileUpload(file.originalname);
                var directory = '';
                await moveFile(file.path, 'publics/uploads/' + name.name + path.sep  + name.chapter + path.sep + file.originalname);
                directory = path.dirname('/uploads/'  + name.name + path.sep  + name.chapter + path.sep + file.originalname) + path.sep + file.originalname;
               let info = await helpers.getInformationFile(file, directory);
               fileUploads.push(info);
               if (fileUploads) {
                   ctx.body = {
                       status : 'ok',
                       data: fileUploads,
                       message: 'upload file success'
                   }
               }
               else {
                   ctx.body = {
                       status: 'ok',
                       message: 'can not upload file'
                   }
               }
           }
       }

   }catch (e) {
    
   }
}

async function getFileByUser(ctx) {
    let user_id = ctx.params.user_id;
    let file_id = ctx.params.file_id;
    let files = await File.getFileByUser(user_id, file_id);
    if (files) {
        return ctx.body = {
            status: 'ok',
            data: files
        }
    }

    else {
        return ctx.body = {
            status: 'ok',
            message: 'file not found'
        }
    }
}

async function getFileByMangaId(ctx) {
    let manga_id = ctx.params.manga_id;
    let file_id = ctx.params.file_id;
    let files = await File.getFileByManga(manga_id, file_id);
    if (files) {
        return ctx.body = {
            status: 'ok',
            data: files
        }
    }
    else {
        return ctx.body = {
            status: 'ok',
            message: 'files not found'
        }
    }
}


async function updateFileAvatar(ctx) {
    let body = ctx.request.body;
    let file_id = ctx.params.file_id;
    let file = await File.updateFile(file_id, body);
    console.log(file);
    if (file) {
        return ctx.body = {
            status: 'ok',
            data: file,
            message: 'update file success'
        }
    } else {
        return ctx.body = {
            status: 'error',
            message: 'file not found'
        }
    }

}

module.exports = {
    uploadFile,
    getFileByUser,
    updateFileAvatar,
    getFileByMangaId
}