const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpaclPlugin = require('html-webpack-plugin');

const devConf = require('./config/dev.conf');
const prodConf = require('./config/prod.conf');
const MODE = process.env.NODE_ENV || 'development';
const build = MODE === 'production' ? true : false;

let defaultConf = {
    entry: resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle[hash:5].js',
        path: resolve(__dirname, './dist'),
        publicPath: 'test',
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
    resolve: {
        alias: {
            components: resolve(__dirname, './src/views/components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
        ],
    },
    plugins: [
        new htmlWebpaclPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
    ],
};

module.exports = merge(defaultConf, build ? prodConf : devConf);
