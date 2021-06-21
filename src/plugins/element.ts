import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Message,
} from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';

export default {
  install(Vue: any) {
    Vue.prototype.$ELEMENT = { size: 'small', locale };
    Vue.prototype.$message = Message;
    Vue.use(Button);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Dropdown);
    Vue.use(DropdownItem);
    Vue.use(DropdownMenu);
  },
};
