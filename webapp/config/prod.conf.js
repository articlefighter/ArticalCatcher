const { DllPlugin } = require('webpack');
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode:'production',
    optimization: {
        minimize: true,
        // minimizer: [
            // new UglifyWebpackPlugin({
            //     parallel: true,
            //     uglifyOptions: {
            //         compress: {
            //             warnings: false,
            //             drop_console: true,
            //             pure_funcs: ['console.log'],
            //         },
            //     },
            //     sourceMap: true,
            // }),
            // new TerserPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true, // Must be set to true if using source-maps in production
            //     terserOptions: {
            //         // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            //     },
            // }),
        // ],
        // splitChunks: {
        //     chunks: 'async',
        //     minSize: 3000,
        //     maxSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10,
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true,
        //         },
        //     },
        // },
    },
    plugins: [
        new CleanWebpackPlugin(),

        // new UglifyWebpackPlugin({
        //     parallel: true,
        //     uglifyOptions: {
        //         compress: {
        //             warnings: false,
        //             drop_console: true,
        //             pure_funcs: ['console.log'],
        //         },
        //     },
        //     sourceMap: true,
        // }),
        new WebpackBuildNotifierPlugin({
            title: 'webpack打包结束',
            logo: resolve('./res/favor.jpg'),
            suppressSuccess: true,
        }),
        // new BundleAnalyzerPlugin(),
    ],
};
