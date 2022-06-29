const orderController = require('../controller/order.controller')
module.exports = (app) => {
    app.post('/create-order', orderController.createOrder)
}