/** @format */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");

const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "./index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },

            {
                test: /\.?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },

            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "./index.html"),
        }),
        new ProvidePlugin({
            React: "react",
        }),
        new ESLintPlugin(),
    ],
    mode: "development",
};
