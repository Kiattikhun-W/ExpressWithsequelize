const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
    let where = {}
    let offset = {}
    let limit = null
    let page = +req.query.page || 1
    if (req.query.gender) {
        where.gender = req.query.gender
    }
    if (req.query.category) {
        where.category = req.query.category
    }
    if (req.query.size) {
        where.size = req.query.size
    }
    if (req.query.limit) {
        limit = +req.query.limit
        offset['offset'] = limit * (page - 1)
    }
    console.log({ where, limit, ...offset })
    console.log(offset)
    try {
        let _query = await Product.findAll({ where, ...offset, limit })
        const status = 200
        res.status(200).send({ data: _query, status })


    } catch (error) {
        res.status(500).send({ data: [], message: 'Get Product failed', error })

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