let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.common.js');
let helpers = require('./helpers.js');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let WebpackNotifierPlugin = require('webpack-notifier');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval',
    entry: {
        'app': './client/app/app.js'
    },
    output: {
        path: helpers.root('bundle'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            }),
            test: /\.(css|less)$/
        }]
    },
    plugins: [
        new ProgressBarPlugin(),
        new WebpackNotifierPlugin({
            alwaysNotify: true
        }),
        new webpack.DefinePlugin({
            'MS_GATEWAY_URL': JSON.stringify(process.env.MS_GATEWAY_URL)
        }),
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: false,
            compressor: {
                drop_console: true,
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('client/img'),
            to: helpers.root('bundle/img')
        }]),
        new CopyWebpackPlugin([{
            from: helpers.root('client/fonts'),
            to: helpers.root('bundle/fonts')
        }]),
        new CopyWebpackPlugin([{
            from: helpers.root('client/humans.txt'),
            to: helpers.root('bundle')
        }]),
        new CopyWebpackPlugin([{
            from: helpers.root('client/robots.txt'),
            to: helpers.root('bundle')
        }])
    ]
});
