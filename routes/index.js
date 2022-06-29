module.exports = (app) => {
    require('./product.route')(app)
    require('./order.route')(app)
    require('./order-list.route')(app)
    require('./user.route')(app)


}