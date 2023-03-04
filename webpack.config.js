const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { DefinePlugin } = require("webpack");
const gitCommitInfo = require("git-commit-info");

const fileConfig = path.join(
  __dirname,
  `/configs/${process.env.NODE_CONF}.env`
);
require("dotenv").config({
  path: fileConfig,
});

const DEFAULT_MODE =
  process.env.BUILD_MODE === "default" || process.env.BUILD_MODE === undefined;
const DEMO_MODE = process.env.BUILD_MODE === "demo";

const DEBUG = process.env.NODE_ENV !== "production";
const SHARE_HOST = process.env.SHARE_HOST === "true";
const PRODUCTION = process.env.NODE_ENV === "production";
const HOST = SHARE_HOST ? "0.0.0.0" : "localhost";

const ifDefLoaderOptions = {
  DEBUG,
  PRODUCTION,
  DEMO_MODE,
  DEFAULT_MODE,
};

module.exports = {
  entry: {
    game: "./src/index.js",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new Dotenv({
      path: fileConfig,
      systemvars: true,
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      COMMIT_INFO: JSON.stringify(gitCommitInfo()),
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "src/index.html",
      meta: {
        viewport:
          "width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0",
      },
    }),
    // new CopyPlugin({
    //   patterns: [{ from: "src/assets", to: "assets" }],
    // }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  mode: DEBUG ? "development" : "production",
  devtool: DEBUG ? "source-map" : false,
  devServer: {
    // contentBase: outputDir,
    compress: DEBUG ? false : true,
    // inline: true,
    host: HOST,
    port: 8080,
    hot: true,
    allowedHosts: ["all"],
    historyApiFallback: {
      index: "index.html",
    },
  },
  optimization: {
    minimize: PRODUCTION ? true : false,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ifdef-loader",
            options: ifDefLoaderOptions,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.csv$/,
        loader: "csv-loader",
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      },
    ],
  },
};
