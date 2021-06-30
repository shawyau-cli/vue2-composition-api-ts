import Vue from 'vue';
import 'core-js/es/weak-map';
import VueCompositionAPI from '@vue/composition-api';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/component';

import '@/assets/css/global.scss';
import { importAllSvg } from '@/components/IconSvg';
importAllSvg();

import ElementUI from '@/plugins/element';
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

// 主题换肤
import { initThemeColor } from '@/utils/themeColorClient';

initThemeColor();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
