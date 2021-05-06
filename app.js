const app        = require('./src/app/express.config');
const mongoose = require('./src/app/db.config');
const compression = require('compression');


// mongodb connect

mongoose.connect();

app.use(compression());






app.listen(9900, () => {
    console.log('listening on port 9900!!')
});

// logger
//require('./src/app/logger');

module.exports = app;