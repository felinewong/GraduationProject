
module.exports = {
    'GET /': async (ctx,next) =>{
        ctx.render('index.html');
    },
    'GET /shop': async (ctx,next) =>{
        ctx.render('shop.html');
    },
    'GET /map': async (ctx,next) =>{
        ctx.render('map.html');
    },
    'GET /city': async (ctx,next) =>{
        ctx.render('city.html');
    },
    'GET /test': async (ctx,next) =>{
        ctx.render('test.html');
    },
    'GET /baiduMap': async (ctx,next) =>{
        ctx.render('baiduMap.html');
    },
    'GET /getCoord': async (ctx,next) =>{
        ctx.render('getCoord.html');
    }
};