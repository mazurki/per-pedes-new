const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'pages/index.html'
}));

plugins.push(new ExtractTextPlugin("styles.css"));
plugins.push(new CleanWebpackPlugin(__dirname + '/dist'));

module.exports = {
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    entry: __dirname + '/scripts/app.js',

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: "css-loader"
                    },{
                        loader: 'sass-loader'
                    }
                ])
            },{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]

    },

    plugins
}
