const db = require('../db');

module.exports = db.defineModel('products', {
    name: db.STRING(100),
    manufacturer: db.STRING(100),
    price: db.DOUBLE
});