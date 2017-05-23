const model = require('../model');
const Sequelize = require('sequelize');
let airquality = model.airquality;

const config = require('../config');



var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


module.exports = {
    getAirquality: async () => {
        let ret = await airquality.findAll();
        console.log(JSON.stringify(ret));
        return ret;
    },

    getAirqualitys: async (params) => {
        let ret = await airquality.findAll({
            where: params
        });
        console.log(JSON.stringify(ret));
        return ret;
    },
    getCount: async () => {
        let ret = await airquality.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
        });
        console.log(JSON.stringify(ret));
        return ret;
    },
    
    createAirquality: async (name,manufacturer,price) => {
        let ret = await airquality.create({
            city: db.STRING(100),
            aqi: aqi,
            pm25: pm25,
            pm10: pm10,
            so2: so2,
            co: co,
            no2: no2,
            o3: o3,
            date: date
        });
        console.log('create' + JSON.stringify(ret));
        return ret;
    },

    deleteAirquality: async (id) => {
        let ret = await airquality.destroy({
            id: id
        });
        console.log('desytroy: ' + JSON.stringify(ret));
        return ret;
    }


};