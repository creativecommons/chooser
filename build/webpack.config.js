/*eslint no-undef: 0*/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: [
        path.resolve(__dirname, "./bin/concatenated-js.js"),

        "./src/styles/styles.css",
        "./src/styles/bulma-mods.css"
    ],
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
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, "../src/assets"), to: "assets"},
            {from: path.resolve(__dirname, "../src/index.html"), to: "."}
        ])
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