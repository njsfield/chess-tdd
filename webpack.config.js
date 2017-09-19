const path = require("path");

module.exports = {
  context: path.join(__dirname, "src"), // Path of client-side code directory
  entry: ["./index.js"], // (Start file)
  output: {
    path: path.join(__dirname, "public", "assets"),
    publicPath: "/assets/",
    filename: "app.js"
  },
  module: {
    rules: [
      // For all files...
      {
        test: /\.js$/, // If .js extension then
        exclude: /node_modules/, // (but not node_modules)
        use: ["babel-loader"] // Run through babel
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")] // Where should webpack look for files referenced by import/require?
  }
};
