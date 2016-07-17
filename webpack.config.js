module.exports = {
  entry: {
    app: ['babel-polyfill', "./index.js"]
  },
  output: {
    library: 'nodePrototyper',
    libraryTarget: 'commonjs2',
    filename: 'dist/index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js"]
  },
  // node: {
  //   global: true
  // }
};
