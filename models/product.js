const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    gender: Sequelize.STRING,
    category: Sequelize.STRING,
    size: Sequelize.STRING,
    price: Sequelize.DOUBLE,
});

module.exports = Product;
