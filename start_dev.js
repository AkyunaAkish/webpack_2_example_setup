const nodemon = require('nodemon');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const port = 7000;

const options = {
    inline: true,
    stats: 'minimal',
    progress: true,
    historyApiFallback: true,
    proxy: {
        '*': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
};

const server = new WebpackDevServer(webpack(config), options);

nodemon({
    script: './server/server.js',
    ext: 'js json'
});

nodemon.on('start', () => {
    server.listen(port, 'localhost', (err) => {
        if (err) console.log('Webpack Dev-Server Error: ', err);
        if (!err) console.log('Webpack Dev-Server listening at localhost:', port);
    });
}).on('quit', () => {
    console.log('Dev processes exited');
    process.exit();
}).on('restart', (files) => {
    console.log('Nodemon restarted due to changes in these files: ', files);
});
