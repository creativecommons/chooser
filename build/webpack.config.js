/*eslint no-undef: 0*/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: "production",
    optimization: {
        //minimize: false
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: [
        // js is concatenated prior to webpack build
        path.resolve(__dirname, "./bin/concatenated-js.js"),

        "./src/styles/styles.css",
        "./src/styles/bulma-mods.css"
    ],
    output: {
        //filename: "prod.js", // Not imported, breaks some stuff.
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.min.css",
            chunkFilename: "styles.min.css"
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, "../src/assets"), to: "assets"},
            {from: path.resolve(__dirname, "../src/index.html"), to: "."},

            // These two are temporary fixes
            {from: path.resolve(__dirname, "../src/scripts/"), to: "./scripts/"},
            {from: path.resolve(__dirname, "../src/index.js"), to: "."}
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