const orderListController = require('../controller/order-list.controller')
const isAuth = require('../middleware/authJwt');

module.exports = (app) => {
    app.get('/order-list', isAuth, orderListController.getOrderList)
    app.post('/create-orderList', orderListController.createOrderList)
}