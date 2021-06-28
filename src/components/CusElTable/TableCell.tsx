import { defineComponent } from '@vue/composition-api';
import { VueConstructor } from 'vue/types/umd';

type TableCellProps = {
  scope: any;
  comp: VueConstructor<Vue>;
};

export default defineComponent<TableCellProps>({
  name: 'TableCellRender',
  props: {
    scope: {
      type: Object,
      required: true,
    },
    comp: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { comp: Comp } = props;
    return () => <Comp row={props.scope.row} />;
    // const data = {
    //   props: {
    //     ...attrs,
    //     row: props.scope.row,
    //     index: props.scope.$index,
    //   },
    //   on: {
    //     ...listeners,
    //   },
    // };
    // return () => <Comp {...data} />;
  },
});
