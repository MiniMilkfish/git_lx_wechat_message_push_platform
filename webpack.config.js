// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展
const webpack = require('webpack'); // 用于访问内置插件

module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify('production'),
      "process.env.VERSION": JSON.stringify("2.1.7"),
      "process.env.DATE": JSON.stringify(new Date().toISOString())
    }),
  );

  return webpackConfig;
};
