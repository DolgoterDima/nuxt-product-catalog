const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './'),
    },
  },
};
