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
const htmlWebpackPlugin = require('html-webpack-plugin');
const generateConfigPlugin = require('./generateConfigPlugin');
const HappyPack = require('happypack');

const devConf = require('./config/dev.conf');
const prodConf = require('./config/prod.conf');
const dllConf = require('./config/dll.conf');
const MODE = process.env.NODE_ENV || 'development';
const BUILD = MODE === 'production' ? true : false;
const smp = new SpeedMeasurePlugin();

let baseUrl = BUILD ? '' : '/api';

setTitle('webpack start BUILD');

const loading = {
    html: `<div style='position:fixed;width:100vw;height:100vh;background:url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553754321343&di=68c7721d5ac711be7ccaf0b3d247cb5b&imgtype=0&src=http%3A%2F%2Fimg.ui.cn%2Fdata%2Ffile%2F3%2F4%2F0%2F1814043.gif%3FimageMogr2%2Fauto-orient%2Fstrip%2Fthumbnail%2F%2521900%253E") no-repeat  center center/30%  '></div>`,
};

let entry =
    MODE === 'dll'
        ? {
              vendor: [
                  'babel-polyfill',
                  'whatwg-fetch',
                  'react',
                  'react-dom',
                  'turndown',
              ],
          }
        : {
              main: ['babel-polyfill', resolve(__dirname, './src/index.js')],
          };

let defaultConf = {
    entry,
    output: {
        filename: '[name]_[hash:5].js',
        path: resolve(__dirname, './dist'),
        publicPath: BUILD ? 'http://localhost:3001/' : '',
        // publicPath: '/webapp',
    },
    resolve: {
        alias: {
            components: resolve(__dirname, './src/views/components'),
            res: resolve(__dirname, './src/res')
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['happypack/loader?id=babel'],

                include: resolve(__dirname, './src'),
                exclude: /node_modules/,
            },
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
            {
                test: /\.(jpg|jpge|png|eot|ttf|woff|svg)/,
                loader: 'file-loader',
            },
        ],
    },
    performance: {
        maxEntrypointSize: 300000,
        maxAssetSize: 300000,
    },
    plugins: [
        new generateConfigPlugin({
            path: resolve(__dirname),
            content: {
                baseUrl,
            },
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            loading,
        }),
        new webpack.DefinePlugin({
            mode: JSON.stringify(MODE),
        }),
        new HappyPack({
            id: 'babel',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                '@babel/env',
                                {
                                    loose: true,
                                    modules: false,
                                },
                            ],
                            '@babel/preset-react',
                        ],
                        plugins: BUILD
                            ? [
                                  '@babel/plugin-proposal-class-properties',
                                  '@babel/plugin-syntax-dynamic-import',
                              ]
                            : [
                                  '@babel/plugin-proposal-class-properties',
                                  'babel-plugin-dynamic-import-node',
                                  '@babel/plugin-syntax-dynamic-import',
                              ],
                    },
                },
            ],
        }),

        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:5].css',
            chunkFilename: '[id]_[contenthash:5].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //         preset: ['default', { discardComments: { removeAll: true } }],
        //     },
        //     canPrint: true,
        // }),

        new ProgressBarPlugin(),
    ],
};

module.exports = smp.wrap(
    merge(defaultConf, BUILD ? prodConf : MODE === 'dll' ? dllConf : devConf)
);
