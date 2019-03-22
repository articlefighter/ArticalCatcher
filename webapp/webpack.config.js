const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const setTitle = require('node-bash-title');
var GenerateAssetPlugin = require('generate-asset-webpack-plugin');
const htmlWebpaclPlugin = require('html-webpack-plugin');
const generateConfigPlugin = require('./generateConfigPlugin');

const devConf = require('./config/dev.conf');
const prodConf = require('./config/prod.conf');
const dllConf = require('./config/dll.conf');
const MODE = process.env.NODE_ENV || 'development';
const build = MODE === 'production' ? true : false;
const smp = new SpeedMeasurePlugin();

let baseUrl = build ? '' : '/api';

setTitle('webpack start build');



let entry =
    MODE === 'dll'
        ? {
              vendor: ['babel-polyfill', 'whatwg-fetch', 'react', 'react-dom','turndown'],
          }
        : {
              vendor: ['babel-polyfill', 'whatwg-fetch', 'react','react-dom', 'turndown'],
              main: resolve(__dirname, './src/index.js'),
          };

// const createConfig = compilation => {
//     return JSON.stringify({
//         baseUrl: baseUrl,
//     });
// };

let defaultConf = {
    entry,
    output: {
        filename: '[name][hash:5].js',
        path: resolve(__dirname, './dist'),
        publicPath: '/dist',
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
            // {
            //     test: /\.(scss|css)$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader!sass-loader',
            //     }),

            //     // loader: 'style-loader!css-loader!sass-loader',
            // },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        // new ExtractTextPlugin("main.css")
        new generateConfigPlugin({
            path:resolve(__dirname),
            content:{
                baseUrl
            }
        }),
        new htmlWebpaclPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // new GenerateAssetPlugin({
        //     filename: '../config.json',
        //     fn: (compilation, cb) => {
        //         cb(null, createConfig(compilation));
        //     },
        //     extraFiles: [],
        // }),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //         preset: ['default', { discardComments: { removeAll: true } }],
        //     },
        //     canPrint: true,
        // }),

        // new webpack.DllPlugin({
        //     context:__dirname,
        //     name:'[name]_[hash:3]',
        //     path:resolve(__dirname,'mainfest.json')
        // }),
        new ProgressBarPlugin(),
    ],
};

module.exports = smp.wrap(
    merge(defaultConf, build ? prodConf : MODE === 'dll' ? dllConf : devConf)
);
