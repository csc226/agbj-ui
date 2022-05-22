"use strict";

var utils = require('./utils');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': utils.resolve('src'),
      'components': utils.resolve('packages/components'),
      'demo-vuecli3-ui': utils.resolve('packages/components/index.js')
    }
  }
};