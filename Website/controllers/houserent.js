const model = require('../model');
const Sequelize = require('sequelize');
let houserent = model.houserent;

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
    getAll: async () => {
        let ret = await houserent.findAll();
        console.log(JSON.stringify(ret));
        return ret;
    },

    getHouserents: async (params) => {
        let ret = await houserent.findAll({
            where: params
        });
        console.log(JSON.stringify(ret));
        return ret;
    },
    getCount: async () => {
        let ret = await houserent.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
        });
        console.log(JSON.stringify(ret));
        return ret;
    },
    
    createHouserent: async (name,manufacturer,price) => {
        let ret = await houserent.create({
            city: db.STRING(100),
        });
        console.log('create' + JSON.stringify(ret));
        return ret;
    },

    deleteHouserent: async (id) => {
        let ret = await houserent.destroy({
            id: id
        });
        console.log('desytroy: ' + JSON.stringify(ret));
        return ret;
    }


};