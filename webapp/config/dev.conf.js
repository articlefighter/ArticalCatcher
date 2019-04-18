const webpack = require('webpack');
const path = require('path');
const target = 'http://localhost:3000';

module.exports = {
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        compress: true,
        proxy: {
            '/api': {
                target,
                changeOrigin: true,
                pathRewrite: (path,req)=>{
                    let requestPath = path.replace('/api','');
                    let host = req.headers.host
                    console.log(`requset   ${target}${requestPath}`)
                    return requestPath
                },
                autoRewrite:true
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
