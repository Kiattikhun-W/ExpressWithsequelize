const Sequelize = require('sequelize');

const sequelize = new Sequelize('express_demo', 'root', 'root123456', {
    dialect: 'mysql',
    host: 'localhost'
});
// console.log(sequelize)
module.exports = sequelize;
