const { DllPlugin } = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    plugins:[
        new CleanWebpackPlugin(),
        new DllPlugin({
            path: path.join(__dirname, '../dist/manifest.json'),
        })
    ]
}