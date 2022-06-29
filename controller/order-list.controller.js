const Order = require("../models/order");
const OrderList = require("../models/order-list");
const Product = require("../models/product");

exports.getOrderList = async (req, res, next) => {
    let value = {
        where: {}
    }
    let page = +req.query.page || 1
    if (req.query.startdate) {
        value.where.start_date = req.query.startdate
    }
    if (req.query.status) {
        value.where.status = req.query.status
    }
    if (req.query.enddate) {
        value.where.end_date = req.query.enddate
    }
    if (req.query.limit) {
        value.limit = +req.query.limit
        value.offset = +value.limit * (page - 1)
    }

    try {
        let _query = await OrderList.findAll({ include: { model: Order, include: [Product] }, ...value })
        const status = 200
        res.status(200).send({ data: _query, status })

    } catch (error) {
        res.status(500).send({ data: [], message: 'Get OrderList failed', error })
    }
};
exports.createOrderList = async (req, res, next) => {
    try {
        const data = await OrderList.bulkCreate([
            {
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                status: req.body.status,
            },
        ])
        // try {
        //     let orderListId = +data[0].id
        //     let dataOrder = await Order.bulkCreate([{
        //         address: req.body.address,
        //         quantity: req.body.quantity,
        //         ProductId: req.body.ProductId,
        //         orderListId: orderListId,
        //     }])
        //     res.send(dataOrder)

        // } catch (error) {
        //     throw Error('failed to add order')
        // }

        // Order.createOrderList({
        //     start_date: new Date(),
        //     end_date: new Date(),
        //     status: 'Pending',
        // })

        // res.status(200).send({ data: dataOrderList, message: 'insert success' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ data: [], message: 'Insert failed', error: error.toString() })
    }
}

// exports.getOrderList = async (req, res, next) => {
//     let where = {}
//     let offset = {}
//     let limit = null
//     let page = +req.query.page || 1
//     if (req.query.startdate) {
//         where.start_date = req.query.startdate
//     }
//     if (req.query.status) {
//         where.status = req.query.status
//     }
//     if (req.query.enddate) {
//         where.end_date = req.query.enddate
//     }
//     if (req.query.limit) {
//         limit = +req.query.limit
//         offset['offset'] = limit * (page - 1)
//     }

//     try {
//         let _query = await OrderList.findAll({ where, ...offset, limit, include: { model: Order, include: [Product] } })
//         const order = new OrderList()
//         console.log('order', await order.hasOrders(17))
//         const status = 200
//         res.status(200).send({ data: _query, status })

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ data: [], message: 'Get OrderList failed', error })
//     }
// };