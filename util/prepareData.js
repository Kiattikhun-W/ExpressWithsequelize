const Product = require("../models/product");
const sequelize = require("./database");
const { port } = require('../config/config');
const Order = require("../models/order");
const OrderList = require("../models/order-list");

module.exports = async (app) => {
    try {
        Order.belongsTo(Product, { constraints: true, onDelete: 'CASCADE' });
        Product.hasMany(Order);
        Order.belongsTo(OrderList, { constraints: true, onDelete: 'CASCADE' });
        OrderList.hasMany(Order);
        const sequelizeSync = await sequelize.sync();
        // await sequelize.sync({ force: true });

        const findProduct = await Product.findByPk(1);

        if (!findProduct) {
            await Product.bulkCreate([
                {
                    gender: 'male',
                    category: 'Plain Color',
                    size: 'XS',
                    price: 500
                },
                {
                    gender: 'female',
                    category: 'Pattern',
                    size: 'XS',
                    price: 550
                },
                {
                    gender: 'male',
                    category: 'Figure',
                    size: 'XL',
                    price: 1005
                }])

        }

    } catch (error) {
        throw Error('some thing worngs' + error)
    }
};