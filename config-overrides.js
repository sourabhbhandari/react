const {
  override,
  fixBabelImports,
  addLessLoader,
  disableEsLint,
  addDecoratorsLegacy
} = require('customize-cra');

function myOverrides(config) {
  // do stuff to config

  let loaders = config.module.rules[2].oneOf;
  loaders.splice(loaders.length - 1, 0, {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }
    ]
  });
  return config;
}
module.exports = override(
  myOverrides,
  addDecoratorsLegacy(),
  disableEsLint(),
  // 按需加载 antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // 添加加载 less 的 javascriptEnabled 和 antd 的主题配置。
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  })
);
