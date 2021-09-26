process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';
process.env.PORT = process.env.PORT || 3000;

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const path = require('path');

const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];

for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      'webpack-dev-server/client?http://localhost:' + process.env.PORT,
      'webpack/hot/dev-server',
    ].concat(config.entry[entryName]);
  }
}

delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    port: process.env.PORT,
    allowedHosts: 'all',
    client: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    devMiddleware: {
      publicPath: `http://localhost:${process.env.PORT}`,
      writeToDisk: true,
    },
    static: {
      directory: path.join(__dirname, '../build'),
    },
  },
  compiler,
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

server.start();
