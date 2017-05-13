const db = require('../db');

module.exports = db.defineModel('airquality', {
    city: db.STRING(100),
    aqi: db.DOUBLE,
    pm25: db.DOUBLE,
    pm10: db.DOUBLE,
    so2: db.DOUBLE,
    co: db.DOUBLE,
    no2: db.DOUBLE,
    o3: db.DOUBLE,
    date: db.DATEONLY
});