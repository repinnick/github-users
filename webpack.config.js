const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/script.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLPlugin({
      template: "./src/index.html",
    }),
  ],
  devtool: "eval-cheap-source-map",
};
