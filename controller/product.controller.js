const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
    let value = {
        where: {}
    }
    let page = +req.query.page || 1
    if (req.query.gender) {
        value.where.gender = req.query.gender
    }
    if (req.query.category) {
        value.where.category = req.query.category
    }
    if (req.query.size) {
        value.where.size = req.query.size
    }
    if (req.query.limit) {
        value.limit = +req.query.limit
        value.offset = +value.limit * (page - 1)
    }

    try {
        let _query = await Product.findAll(value)
        const status = 200
        res.status(200).send({ data: _query, status })


    } catch (error) {
        next(error)

    }
};

exports.createProducts = async (req, res, next) => {
    try {
        const data = await Product.bulkCreate([
            {
                gender: req.body.gender,
                category: req.body.category,
                size: req.body.size,
                price: req.body.price,
            },
        ])
        res.status(200).send({ data, message: 'insert success' })
    } catch (error) {
        res.status(500).send({ data: [], message: 'Insert failed', error })
    }
}

exports.updateProducts = async (req, res, next) => {
    try {
        let product = await Product.findByPk(req.params.prodId)
        if (!product) {
            throw Error('No Product Found')
        }
        product.category = req.body.category
        product.gender = req.body.gender
        product.size = req.body.size
        product.price = req.body.price

        await product.save()

        // res.send(product)
        res.status(200).send({ data: product, message: 'update success' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ data: [], message: 'Update failed', error: error.toString() })
    }
}

exports.deleteProducts = async (req, res, next) => {
    try {
        let product = await Product.findByPk(req.params.prodId)
        if (!product) {
            throw Error('No Product Found')
        }

        await product.destroy()

        // res.send(product)
        res.status(200).send({ message: 'Delete success' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ data: [], message: 'Delete failed', error: error.toString() })
    }
}