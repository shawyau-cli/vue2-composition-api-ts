const {
  regDev,
  externals,
  cdnMap,
  uglifyJsPluginOptions,
  splitChunksOptions,
} = require('./src/config/pack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const forElementUI = require('webpack-theme-color-replacer/forElementUI');
const JoinFileContentPlugin = require('join-file-content-plugin');

const appConfig = require('./src/config/app.config');

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: regDev.test(process.env.NODE_ENV) ? '/' : './',
  productionSourceMap: false,
  // scss变量全局可用
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/css/variables.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    // 设置路径别名
    config.resolve.alias.set('@', resolve('src'));

    // 在main.js入口文件添加ES模块按需加载
    config.entry('main').add('babel-polyfill');

    // 移除 prefetch 插件
    config.plugins.delete('prefetch');

    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');

    config.module
      .rule('svg')
      .exclude.add(/iconsvg/)
      .end();

    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');

    config.module
      .rule('svgo')
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        externalConfig: './src/assets/iconsvg/svgo.yml',
      });

    // 外部扩展
    config.externals(regDev.test(process.env.NODE_ENV) ? {} : externals);
    config.plugin('html').tap((args) => {
      args[0].cdn = regDev.test(process.env.NODE_ENV) ? {} : cdnMap;
      return args;
    });

    // 代码分割
    config.optimization.splitChunks(
      regDev.test(process.env.NODE_ENV) ? {} : splitChunksOptions,
    );
  },
  configureWebpack: (config) => {
    // 将theme-changed.scss应用到element-ui，供babel-plugin-component按需加载
    config.plugins.push(
      new JoinFileContentPlugin({
        file: 'node_modules/element-ui/packages/theme-chalk/src/common/var.scss',
        prependFile: 'src/assets/css/element-var-changed.scss',
      }),
    );
    // 生成仅包含颜色的替换样式（主题色等）
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: appConfig.getThemeColors(
          appConfig.themeColor,
          forElementUI.getElementUISeries,
          ThemeColorReplacer.varyColor,
        ),
        changeSelector: forElementUI.changeSelector,
        isJsUgly: !regDev.test(process.env.NODE_ENV) ? true : undefined,
      }),
    );
    //压缩代码
    if (!regDev.test(process.env.NODE_ENV)) {
      config.plugins.push(new UglifyJsPlugin(uglifyJsPluginOptions));
    }
  },
};
