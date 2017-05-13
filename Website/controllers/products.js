const model = require('../model');

let products = model.products;

module.exports = {
    getProducts: async () => {
        let ret = await products.findAll();
        console.log(JSON.stringify(ret));
        return ret;
    },

    getProduct: () => {

    },

    createProduct: async (name,manufacturer,price) => {
        let ret = await products.create({
            name: name,
            manufacturer: manufacturer,
            price: price
        });
        console.log('create' + JSON.stringify(ret));
        return ret;
    },

    deleteProduct: async (id) => {
        let ret = await products.destroy({
            id: id
        });
        console.log('desytroy: ' + JSON.stringify(ret));
        return ret;
    }


};