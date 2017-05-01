//因为导入的是一个class 所以大写
const Koa = require('koa');

//post_body 解析
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

const model = require('./model');

//创建一个Koa对象表示 web app本身
const app = new Koa();


//对于任何请求 app将会调用该异步函数处理请求
//log request url
app.use(async (ctx,next) =>{
    console.log( `Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//static file support
let staticFiles = require('./static-files');
app.use(staticFiles('/static/',__dirname+'/static'));


app.use(bodyParser());


app.use(templating('views',{
    noCache: true,
    watch: true
}));

// bind .rest() for ctx;
app.use(rest.restify());


//add router middleware
app.use(controller());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');