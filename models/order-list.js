const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const OrderList = sequelize.define('order-list', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    start_date: Sequelize.DATEONLY,
    end_date: Sequelize.DATEONLY,
    status: Sequelize.STRING,
});

module.exports = OrderList;
