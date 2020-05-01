const sequelize = require("sequelize");
const connection = require("../database/database");

const catalog = connection.define('catalog',{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    price:{
        type: sequelize.DOUBLE,
        allowNull: false

    },
    year:{
        type: sequelize.DATEONLY,
        allowNull: false
    }
})
module.exports = catalog;
//catalog.sync({force: false});