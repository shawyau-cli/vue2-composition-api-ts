import { defineComponent } from '@vue/composition-api';
import { VueConstructor } from 'vue/types/umd';

type TableCellProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  },
});
