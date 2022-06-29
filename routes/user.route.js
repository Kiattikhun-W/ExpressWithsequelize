const userController = require('../controller/user.controller')
const { body } = require('express-validator/check');
const User = require('../models/user');
const { validation } = require('../middleware')
module.exports = (app) => {
    app.post('/sign-in', validation.signupValidator, userController.signUp)

    app.post('/login', userController.login)

}