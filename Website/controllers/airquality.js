const model = require('../model');

let airquality = model.airquality;

module.exports = {
    getAirquality: async () => {
        let ret = await airquality.findAll();
        console.log(JSON.stringify(ret));
        return ret;
    },

    getAirqualitys: async (date) => {
        let ret = await airquality.findAll({
            where: {
                date: date,
            }
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