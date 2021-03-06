var os = require('os');
const products = require('./products');
const airquality = require('./airquality');
const houserent = require('./houserent');
const csv = require('node-csvjsonlite');
const coordtransform = require('./coordtransform');
const fs = require('fs');

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products': async (ctx,next) => {
        let ret = await products.getProducts();
        ctx.rest({
            products: ret
        });
    },

    'POST /api/products': async (ctx,next) =>{
        var ret =await products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer,parseFloat(ctx.request.body.price));
        ctx.rest(ret);
    },

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = await products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    },

    'GET /api/airqualitys/date/:date': async (ctx,next) => {
        let ret = await airquality.getAirqualitys({
            date: ctx.params.date
        });
        ctx.rest({
            airquality: ret
        });
    },

    'GET /api/airqualitys/city/:city': async (ctx,next) => {
        var params = new Object();
        if(ctx.query.year){
            params["date"] = {
                $like: ctx.query.year +'-%',         // LIKE '%hat'
            }
        }
        if(ctx.query.month){
            params["date"] = {
                $like: ctx.query.month +'-%',         // LIKE '%hat'
            }
        }
        params['city'] = ctx.params.city;
        let ret = await airquality.getAirqualitys(params);
        ctx.rest({
            airquality: ret
        });
    },

    'GET /api/airquality/count': async (ctx,next) => {
        let ret = await airquality.getCount();
        ctx.rest({
            count: ret
        });
    },
    

    'POST /api/airquality': async (ctx,next) =>{
        var ret =await airquality.createAirquality(ctx.request.body.name, ctx.request.body.manufacturer,parseFloat(ctx.request.body.price));
        ctx.rest(ret);
    },

    'DELETE /api/airquality/:id': async (ctx, next) => {
        console.log(`delete airquality ${ctx.params.id}...`);
        var p = await airquality.deleteAirquality(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('airquality:not_found', 'airquality not found by id.');
        }
    },
    
    
    'GET /api/aqi': async (ctx,next) => {
        let ret = null;
        const csvFilePath='./static/data/haerbing.csv'
        await csv
        .convert(csvFilePath)
            // Detects whether filname is 
            // a local file, URL, or string of data 
        .then(function(data){
            console.log('CSV in JSON', data);
            ret = data;
        });  
        ctx.rest({
            aqi: ret
        });
    },
    
    'GET /api/coordtransform/wgs84_to_gcj02': async (ctx,next) => {
        let ret = null;
        
        var lon = ctx.query.lon;
        var lat = ctx.query.lat;
        ret = coordtransform.wgs84_to_gcj02(lon, lat);

        ctx.rest({
            coord: ret
        });
    },
    
    'GET /api/coordtransform/gcj02_to_bd09': async (ctx,next) => {
        let ret = null;
        
        var lon = ctx.query.lon;
        var lat = ctx.query.lat;
        ret = coordtransform.gcj02_to_bd09(lon, lat);
        
        ctx.rest({
            coord: ret
        });
    },
    
    'GET /api/coordtransform/geocoder': async (ctx,next) => {
        let ret = null;
        
        var address = ctx.query.address;
        ret = coordtransform.geocoder(address);        
        ctx.rest({
            data: ret
        });
    },

    'GET /api/houserents': async (ctx,next) => {
        let ret = await houserent.getAll();
        ctx.rest({
            data: ret
        });
    },
    'GET /api/houserent/count': async (ctx,next) => {
        let ret = await houserent.getCount();
        ctx.rest({
            count: ret
        });
    },
    'GET /api/deviceStatus': async (ctx,next) => {
        
        var arch=os.arch();
        console.log("获取cpu(处理器架构)" + arch);

        var cpus=os.cpus();
        console.log( "获取cpu信息" + cpus);

        var endianness=os.endianness();
        console.log( "字节顺序" + endianness);

        var freemem=os.freemem()
        console.log( " 空闲内存字节" + freemem);

        var homedir=os.homedir();
        console.log( "当前登录用户的根目录" + homedir);

        var hostname=os.hostname()
        console.log(  "操作系统主机名" + hostname);
    
        var networkInterfaces=os.networkInterfaces();
        console.log ("网络配置列表" + networkInterfaces);

        var platform=os.platform();
        console.log( "操作系统类型" + platform);     

        var release=os.release();
        console.log( "操作系统版本" + release);      

        var tmpdir=os.tmpdir()
        console.log( "操作系统临时文件的默认目录" + tmpdir);

        var totalmem=os.totalmem()
        console.log( "系统总内存" + totalmem);

        var type=os.type();
        console.log( "操作系统名称" + type);
     
        var uptime=os.uptime();
        console.log( "计算机正常运行时间" + uptime);

        ctx.rest({
            arch: arch,
            cpus: cpus,
            endianness: endianness,
            freemem: freemem,
            homedir: homedir,
            hostname: hostname,
            networkInterfaces: networkInterfaces,
            platform: platform,
            release: release,
            tmpdir: tmpdir,
            totalmem: totalmem,
            type: type,
            uptime: uptime       
        });
    },
    
};