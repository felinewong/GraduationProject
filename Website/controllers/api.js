const products = require('../products');

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
    }
};