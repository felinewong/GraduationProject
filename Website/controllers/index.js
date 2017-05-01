
module.exports = {
    'GET /': async (ctx,next) =>{
        ctx.render('index.html');
    },
    'GET /shop': async (ctx,next) =>{
        ctx.render('shop.html');
    }
};