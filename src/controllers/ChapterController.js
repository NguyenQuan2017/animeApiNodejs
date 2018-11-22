const Chapter = require('../Models/Chapter');
const File = require('../Models/File');
async function getListChapter(ctx) {
    let chapters = await Chapter.getListChapter();
    console.log(chapters);
    return ctx.body = {
        status: 'ok',
        data: {
            chapters,
            pagination: chapters.pagination
        }
    }
}

async function createChapter(ctx) {
    let body = ctx.request.body;
    let files = body.files;
    let chapter = await Chapter.createChapter(body);

    if (chapter) {
        let itemFiles =  JSON.parse(files);
        try {
            for(let i = 0; itemFiles.length; i++) {
                let file = {
                    name: itemFiles[i].name,
                    mimeType: itemFiles[i].mimeType,
                    slug: itemFiles[i].slug,
                    size: itemFiles[i].size,
                    path: itemFiles[i].path
                };
                let saveFile = await File.saveFile(file);
                chapter.files().attach(saveFile.attributes.file_id);
            }

        } catch(e) {}
        return ctx.body = {
            status: 'ok',
            data: chapter,
            message: 'Chapter was created'
        }
    }
}

module.exports = {
    getListChapter,
    createChapter
};