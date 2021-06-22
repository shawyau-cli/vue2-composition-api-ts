module.exports = {
  presets: ['vca-jsx', '@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'babel-plugin-component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~node_modules/element-ui/packages/theme-chalk/src',
        ext: '.scss',
      },
    ],
  ],
};
