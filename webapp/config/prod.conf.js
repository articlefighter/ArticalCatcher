const { NamedChunksPlugin } = require('webpack');
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// const InlineWebpackPlugin = require('inline-manifest-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            // new UglifyWebpackPlugin({
            //     parallel: true,
            //     cache: true,
            //     uglifyOptions: {
            //         compress: {
            //             warnings: false,
            //             drop_console: true,
            //             pure_funcs: ['console.log'],
            //             booleans: false,
            //             collapse_vars: false,
            //             comparisons: false,
            //             hoist_funs: false,
            //             hoist_props: false,
            //             hoist_vars: false,
            //             if_return: false,
            //             inline: false,
            //             join_vars: false,
            //             keep_infinity: true,
            //             loops: false,
            //             negate_iife: false,
            //             properties: false,
            //             reduce_funcs: false,
            //             reduce_vars: false,
            //             sequences: false,
            //             side_effects: false,
            //             switches: false,
            //             top_retain: false,
            //             toplevel: false,
            //             typeofs: false,
            //             unused: false,

            //             // 除非声明了正在使用生产版本的react-devtools，
            //             // 否则关闭所有类型的压缩。
            //             conditionals: true,
            //             dead_code: true,
            //             evaluate: true,
            //         },
            //         mangle: true,
            //     },
            //     sourceMap: true,
            //     // chunkFilter: (chunk)=>{
            //     //     if(chunk.name==='vendor'){
            //     //         return false
            //     //     }
            //     //     return true
            //     // }
            // }),
            new TerserPlugin({
                // cache: true,
                // parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production,
                minify: (file, sourceMap) => {
                    const uglifyJsOptions = {
                        /* your `uglify-js` package options */
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                        },
                    };

                    if (sourceMap) {
                        uglifyJsOptions.sourceMap = {
                            content: sourceMap,
                        };
                    }

                    return require('uglify-js').minify(file, uglifyJsOptions);
                },
                terserOptions: {
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: -10,
                },
            },
        },
        runtimeChunk:true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new NamedChunksPlugin(),
        new WebpackBuildNotifierPlugin({
            title: 'webpack打包结束',
            logo: resolve('./res/favor.jpg'),
            suppressSuccess: true,
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer:false
        }),
    ],
};
