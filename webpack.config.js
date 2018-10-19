const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function _path(p) {
    return path.join(__dirname, p);
}

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss'
    ],
    output: {
        filename: './js/bundle.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: '/img/[name].[ext]'}
                    }
                ]
            },
            {
                test: /\.(otf|ttf|woff|woff2|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: '../fonts/[name].[ext]'}
                    }
                ]
            },
            // { test: /\.(otf|woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                use:  [  MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
            },
            // {
            //     test: /\.(sass|scss)$/,
            //     include: path.resolve(__dirname, 'src/scss'),
            //     use: ExtractTextPlugin.extract({
            //         use: [
            //             {
            //                 loader: "css-loader",
            //                 options: {
            //                     sourceMap: true,
            //                     minimize: true
            //                 }
            //             },
            //             {
            //                 loader: "resolve-url-loader"
            //             },
            //             {
            //                 loader: "sass-loader",
            //                 options: {
            //                     sourceMap: true
            //                 }
            //             }
            //         ]
            //     })
            // },
        ]
    },
    resolve: {
        alias: {
            // jquery is NOT a peer dependency in jquery.inputmask so a alias
            // is used here to force jquery.inputmask to use your jquery
            // version
            'jquery': _path('node_modules/jquery/dist/jquery'),
            // Switch dependency lib accordingly (this one uses jquery)
            'inputmask.dependencyLib': _path('node_modules/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib'),
            // Core library (order of these aliases shouldn't matter FYI)
            'inputmask' : _path('node_modules/inputmask/dist/inputmask/inputmask'),
            // Allows use of jquery input mask via jquery chaining api/$('selector').inputmask(...)
            'jquery.inputmask': _path('node_modules/inputmask/dist/inputmask/jquery.inputmask'),
            // Add extensions following the pattern below remember to import them as necessary in your .js files
            'inputmask.numeric.extensions': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),
        },
    },
    plugins: [
        // new ExtractTextPlugin({
        //     filename: './css/style.bundle.css',
        //     allChunks: true,
        // }),
        new MiniCssExtractPlugin({
            filename: './css/style.bundle.css'
            // chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: './src/fonts',
                to: './fonts'
            },
            {
                from: './src/js/gijgo/fonts',
                to: './fonts'
            },
            {
                from: './src/favicon',
                to: './favicon'
            },
            {
                from: './src/img',
                to: './img'
            },
            {
                from: './src/uploads',
                to: './uploads'
            },
            {
                from: './src/html',
                to: './'
            }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};