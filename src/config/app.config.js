module.exports = {
  siteTitle: 'Vue2-composition-api-ts', // 网站标题
  siteTokenKey: 'TOKEN', // 本地存储token的Key值
  siteUserKey: 'USERINFO', // 本地存储用户信息的Key值
  ajaxHeadersTokenKey: 'token', // Ajax请求头中token的Key值
  ajaxResponseNoVerifyUrl: ['/login'], // Ajax返回值不参加统一验证的api白名单
  iconfontUrl: [], // iconfont.cn 项目在线生成的 js 地址
  themeColor: '#144fba', // 这个色号必须和主题色是一个颜色才行，要不然出来的css模板文件是空的
  getThemeColors: function (color, getElementUISeries, varyColor, others) {
    var colors = getElementUISeries(color); //element-ui主色系列
    colors.push(
      varyColor.mix('#000', color, 0.1),
      varyColor.mix('#000', color, 0.2),
      varyColor.mix('#000', color, 0.7),
    );
    colors.push.apply(colors, others);
    return colors;
  },
};
