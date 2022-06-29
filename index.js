const express = require('express');
const { port } = require('./config/config');
// const { port } = require('./config/config');
app = express()

require('./config/express')(app)
require('./routes/index')(app)


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


(async () => await require('./util/prepareData')(app))()
app.listen(port, () => {
    console.log('app running on port' + port)
});