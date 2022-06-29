const { body } = require('express-validator/check');

module.exports.signupValidator = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            console.log(value)
            return User.findOne({ where: { email: value } }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
    body('username')
        .trim()
        .not()
        .isEmpty()
]
