const Order = require("../models/order");
const OrderList = require("../models/order-list");

exports.createOrder = async (req, res, next) => {
    try {
        const dataOrder = await Order.bulkCreate([
            {
                quantity: req.body.quantity,
                address: req.body.address,
                ProductId: req.body.ProductId,
            },
        ])
        res.status(200).send({ data: dataOrder, message: 'insert success' })
    } catch (error) {
        res.status(500).send({ data: [], message: 'Insert failed', error: error.toString() })
    }


}