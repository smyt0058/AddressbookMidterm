var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
    entry: __dirname + "/src/js/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.min.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                use: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
            },
            {
                test: /\.(svg|gif|png|eot|woff|ttf)$/,
                use: "url-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "main.css",
            allChunks: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
};

module.exports = webpackConfig;