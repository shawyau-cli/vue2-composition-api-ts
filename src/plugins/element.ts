import { VueConstructor } from 'vue/types/umd';
import {
  Button,
  Col,
  ColorPicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Loading,
  Pagination,
  Table,
  TableColumn,
  Row,
  Message,
} from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';

export default {
  install(Vue: VueConstructor<Vue>): void {
    Vue.prototype.$ELEMENT = { size: 'small', locale };
    Vue.prototype.$message = Message;
    Vue.use(Button);
    Vue.use(Col);
    Vue.use(ColorPicker);
    Vue.use(Row);
    Vue.use(Dropdown);
    Vue.use(DropdownItem);
    Vue.use(DropdownMenu);
    Vue.use(Loading.directive);
    Vue.use(Pagination);
    Vue.use(Table);
    Vue.use(TableColumn);
  },
};
