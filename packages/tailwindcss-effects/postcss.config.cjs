module.exports = {
  plugins: [
    require('postcss-import'),   // löst @import (auch aus node_modules)
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' }),
  ],
};
