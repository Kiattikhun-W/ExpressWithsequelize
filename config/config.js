require('dotenv').config()

module.exports = {
    port: process.env.PORT || 6202,
    secret: process.env.SECRET,
}