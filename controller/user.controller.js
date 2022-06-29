const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { secret } = require('../config/config')
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password
        const hashPw = await bcrypt.hash(password, 12)
        const dataUser = await User.bulkCreate([
            {
                username: username,
                password: hashPw,
                email: email,
            },
        ])

        res.status(200).send({ data: dataUser, message: 'insert success' })
    } catch (error) {
        next(error)
        // res.status(500).send({ data: [], message: 'Insert failed', error: error.toString() })
    }



}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ where: { email } })
        console.log(email)
        if (!user) {
            const error = new Error('Email or Password Incorrect')
            error.statusCode = 401;
            throw error;
        }
        const hwPassword = await bcrypt.compare(password, user.password);

        if (!hwPassword) {
            const error = new Error('Email or Password Incorrect')
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user.email,
                user: user.username
            },
            secret,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, username: user.username });


    } catch (error) {
        next(error)
    }
}