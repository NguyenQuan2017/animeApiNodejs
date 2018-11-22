require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const slugify = require('slugify');

function getTokenFromHeader(token) {
    try {
        var parts = token.split(' ');
        if (parts.length === 2) {
            var bearer = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(bearer)) {
                return credentials;
            }
        }
    }catch (e) {

    }
}

function getUserFromToken(ctx) {
    let token = getTokenFromHeader(ctx.headers.authorization);
    let payload = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    let user = payload.data;
    return user;
}

function getInformationFile(file, dir) {
    let name = file.originalname.split('.');
    let infos = {
        name: name[0],
        mimeType: file.mimetype,
        size: file.size,
        slug: slugify(name[0]),
        path: dir
    };
    return infos;
}

function getNameFromFileUpload(nameFile) {
    let fileName = nameFile.split('-');
    let chapterName = fileName[fileName.length - 1].split('.')[0];
    var directory = {
        'name' : fileName[0],
        'chapter' : chapterName,
    };

    return directory;
}

module.exports = {
    getTokenFromHeader,
    getUserFromToken,
    getInformationFile,
    getNameFromFileUpload
};