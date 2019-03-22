const webpack = require('webpack');
const path = require('path');

module.exports = {
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest: path.resolve(__dirname, "../dist/manifest.json")
        })
    ]
}