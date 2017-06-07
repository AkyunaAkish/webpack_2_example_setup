if (process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'staging') {
    module.exports = require('./webpack/webpack.dev.js');
} else {
    module.exports = require('./webpack/webpack.prod.js');
}
