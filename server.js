require('dotenv').config();

const Koa = require('koa');
const jwt = require('koa-jwt');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve =  require('koa-static');
const app = new Koa();
const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/userRouter');
const authRouter = require('./src/routes/authRouter');
const fileRouter = require('./src/routes/fileRouter');
const commonRouter = require('./src/routes/common');
const categoryRouter = require('./src/routes/categoryRouter');
const genreRouter = require('./src/routes/genreRouter');
const mangaRouter = require('./src/routes/mangaRouter');
const chapterRouter = require('./src/routes/chapterRouter');
const clientRouter = require('./src/routes/clientRouter');
// logger

app.use(async (ctx, next) => {
    try {
        await next() // next is now a function
    } catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
    }
})

// x-response-time
app.use(serve('publics'));
app.use(indexRouter.routes());
app.use(logger());
// Custom 401 handling if you don't want to expose koa-jwt errors to users
// app.use( function (ctx, next) {
//     return next().catch( (err) => {
//         if (err.status === 401 || 400) {
//             ctx.status = 400;
//             ctx.body = 'Protected resource, use Authorization header to get access\n';
//         } else {
//             throw err;
//         }
//     })
// });


//Unprotected middleware
app.use(function(ctx, next) {
    if (ctx.url.match(/^\/public/)) {
        ctx.body = 'unprotected\n';
    } else {
        return next();
    }
});

app.use(bodyParser());
app.use(cors());
app.use(authRouter.routes());
app.use(clientRouter.routes());

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: process.env.SECRET_KEY }));

// Protected middleware
// app.use(function(ctx, next){
//     if (ctx.url.match(/^\/api/)) {
//         ctx.body = 'protected\n';
//     } else {
//         return next();
//     }
// });




app.use(userRouter.routes());
app.use(fileRouter.routes());
app.use(commonRouter.routes());
app.use(categoryRouter.routes());
app.use(genreRouter.routes());
app.use(mangaRouter.routes());
app.use(chapterRouter.routes());

app.listen(process.env.LISTEN_PORT);