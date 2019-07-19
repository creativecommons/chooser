const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const css_loader = require("css-loader");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "output.css",
            chunkFilename: "output.css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: "../",
                        },
                    },
                    "css-loader",
                ],
            },
        ],
    },
};