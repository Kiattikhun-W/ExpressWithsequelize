let ProductController = require('../controller/product.controller')

module.exports = (app) => {
    app.get('/product', ProductController.getProducts)
    app.post('/create-product', ProductController.createProducts)
    app.patch('/update-product/:prodId', ProductController.updateProducts)
    app.delete('/delete-product/:prodId', ProductController.deleteProducts)
}