const express = require('express')
const bodyParser = require('body-parser');

module.exports = (app) => {
    const publicDir = require('path').join(__dirname, '../public/')

    app.use((req, res, next) => {
        const origin = req.get('origin')

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma')
        res.header('Access-Control-Allow-Headers', 'x-access-token,Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma')

        req.method === 'OPTIONS' ? res.sendStatus(204) : next()
    })

    // app.use(require('../util/database'))
    app.use(express.static(publicDir))
    app.use(express.json({ limit: '50mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
}
