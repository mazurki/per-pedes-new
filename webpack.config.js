const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const extractSCSS = new ExtractTextPlugin("css/styles.css");


const SOURCE_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/dist');
const MAIN_JS_FILE = path.join(SOURCE_DIR, 'scripts/app.js');

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(SOURCE_DIR, 'index.html')
}));

plugins.push(extractSCSS);
plugins.push(new CleanWebpackPlugin(DIST_DIR));

module.exports = {
    output: {
        path: DIST_DIR,
        filename: 'scripts/main.js'
    },
    entry: MAIN_JS_FILE,

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: extractSCSS.extract([
                    {
                        loader: "css-loader"
                    },{
                        loader: 'sass-loader'
                    }
                ])
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: [/img/],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'fonts/'
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: [/fonts/],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        useRelativePath: true
                    }
                }
            }
        ]

    },

    plugins
}
