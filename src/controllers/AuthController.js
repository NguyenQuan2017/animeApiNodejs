require('dotenv').config();
const User = require('../Models/UserModel');
// const bodyParser = require('koa-bodyparser');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const helpers = require('../helpers/helpers');

  function expireTime(){
      return Math.floor(Date.now() / 1000) + (60 * 120 * 24 * 30);
  }

  async function register(ctx) {
      let body = ctx.request.body;
      let user = await User.registerUser(body);
      if (user) {
          ctx.body = {
              status: 'ok',
              message: 'created user success',
              data: user
          }
      } else {
          ctx.body = {
              status: 'error',
              message: 'user not created',
          }
      }
  }

  async function login(ctx) {
      let body = ctx.request.body;
  try {
       let user = await User.userLogin(body.email);
       if (!user.length) {
         ctx.status = 401;
         ctx.body = {
             message: 'wrong credentials',
         }
       } else  {
            if (bcrypt.compareSync(body.password, user[0].password)) {
                ctx.body = {
                    message: 'Login success',
                    data: {
                        token: jsonwebtoken.sign({
                            data: user[0],
                            exp: expireTime(),
                        }, process.env.SECRET_KEY)
                    },
                    status: 'ok'
                }
            }
            else {
                ctx.status = 401;
                ctx.body = {
                    message: 'wrong credentials'
                }
            }
       }


  }catch (e) {
    ctx.body = e;
   }
}

async function refreshToken(ctx) {
    let token = helpers.getTokenFromHeader(ctx.headers.authorization);
    if (token != null) {
        let payload = jsonwebtoken.verify(token, process.env.SECRET_KEY);
        delete payload.exp;
        delete payload.iat;
        ctx.body = {
            message: 'token refreshed',
            status: 'ok',
            data: {
                token: jsonwebtoken.sign({
                    data: payload,
                    exp: expireTime()
                }, process.env.SECRET_KEY)
            }
        }

    }
}

async function getUserFromToken(ctx) {
    let user = helpers.getUserFromToken(ctx);
    ctx.body = {
        message: 'get user success',
        status: 'ok',
        data: user
    }
}

module.exports = {
    login,
    register,
    refreshToken,
    getUserFromToken
};