const db = require('../db');

module.exports = db.defineModel('houserent', {
    city: db.STRING(50),
    name: db.STRING(100),
    price: db.DOUBLE,
    area: db.DOUBLE,
    housetype: db.STRING(50),
    floor: db.STRING(50),
    orientation: db.STRING(50),
    underground: db.STRING(50),
    address: db.STRING(50),
    longitude: db.DOUBLE,
    latitude: db.DOUBLE,
    url: db.STRING(100)
});
