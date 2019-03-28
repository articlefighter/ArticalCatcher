const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, '../dist/manifest.json'),
        }),

    ],
};
