const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const proxy = require("http-proxy-middleware");

console.log(path.resolve(__dirname, './static/images'), '=====根目录')
function resolve(dir) {
    return path.resolve(__dirname, dir)
}
module.exports = {
    entry: './app.js', // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 定义输出目录
        filename: 'my-first-webpack.bundle.js'  // 定义输出文件名称
    },
    mode: 'development',
    // mode: 'production',
    module: {

        rules: [
            {
                test: /\.js|jsx$/, // 匹配.js文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url-loader?limit=8192'
            // }
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000,   //表示低于50000字节（50K）的图片会以 base64编码
                        // outputPath:path.resolve(__dirname, 'dist/assets/images/'),
                        outputPath: 'assets/images',
                        name: '[name].[hash:5].[ext]',
                        // // pulbicPath:"./dist/asset/images"
                        pulbicPath: "./dist"
                    }
                }
            }

        ]
    },
    devServer: {
        hot: true, // 热替换
        contentBase: path.join(__dirname, 'dist'), // server文件的根目录
        compress: true, // 开启gzip
        port: 8399, // 端口
        // proxy:[{
        //     context:['/topic'],         // 要代理的接口
        //     target:"http://localhost:8080",
        //     pathRewrite:{"^/topic":""}, // 处理转换
        //   }],
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /.*/, to: './index.html' },
        //     ]
        // }
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.jpg', '.jsx'],
        alias: {
            '@': resolve('src'),
            '~image': resolve('./static/images')
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object'),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};