import client from 'webpack-theme-color-replacer/client';
import getElementUISeries from 'webpack-theme-color-replacer/forElementUI/getElementUISeries';

const appConfig = require('@/config/app.config');

export let curColor = appConfig.themeColor;

// 动态切换主题色
export function changeThemeColor(newColor: string) {
  let customB = (Math.random() * 256).toString(16); // 按你需要生成颜色
  if (customB.length == 1) customB = '0' + customB;
  const options = {
    newColors: appConfig.getThemeColors(
      newColor,
      getElementUISeries,
      client.varyColor,
      ['#88' + customB + customB, '#' + customB + '88' + customB],
    ),
  };
  return client.changer.changeColor(options, Promise).then(() => {
    curColor = newColor;
    localStorage.setItem('theme_color', curColor);
  });
}

export function initThemeColor() {
  const savedColor = localStorage.getItem('theme_color');
  if (savedColor) {
    document.body.style.display = 'none';
    curColor = savedColor;
    changeThemeColor(savedColor).finally(() => {
      document.body.style.display = '';
    });
    changeThemeColor(savedColor);
  }
}
