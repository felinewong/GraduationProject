const products = require('./products');
const airquality = require('./airquality');
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
        let ret = await airquality.getAirqualitys({
            city: ctx.params.city
        });
        ctx.rest({
            airquality: ret
        });
    },

    'GET /api/count': async (ctx,next) => {
        let ret = await airquality.getCount();
        ctx.rest({
            airquality: ret
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
    }
    
};