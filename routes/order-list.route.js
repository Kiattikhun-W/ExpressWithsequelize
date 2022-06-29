const orderListController = require('../controller/order-list.controller')
const { authJwt } = require('../middleware');

module.exports = (app) => {
    app.get('/order-list', authJwt, orderListController.getOrderList)
    app.post('/create-orderList', orderListController.createOrderList)
}