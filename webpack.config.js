const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH=path.resolve(ROOT_PATH,'./dist');
const APP_PATH=path.resolve(ROOT_PATH,'src');
var TEM_PATH = path.resolve(ROOT_PATH, 'src/templates');


module.exports = {
    mode: 'development',
    entry: {
        'app': path.resolve(APP_PATH,'app.js'),
        'mobile': path.resolve(APP_PATH,'mobile.js'),
        'vendors': ['jquery', 'moment']
    },
    output: {
        filename: '[name].js',
        path: BUILD_PATH
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            }
        ]
    },
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },

                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendors',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        //创建了两个HtmlWebpackPlugin的实例，生成两个页面
        new HtmlWebPackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['app', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        }),
        new HtmlWebPackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile', 'vendors'],
            inject: 'body'
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};