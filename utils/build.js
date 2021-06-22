const dotenv = require('dotenv');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

dotenv.config();

const webpack = require('webpack');

const config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

webpack(config, (err) => {
  if (err) throw err;
});
