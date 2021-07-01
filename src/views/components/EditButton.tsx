import { defineComponent } from '@vue/composition-api';
import { useEditInject } from '../composables/useEditContext';

export default defineComponent({
  name: 'EditButton',
  props: {
    row: {
      type: Object,
    },
  },
  setup(props: { row: { hello: string; world: string; id: string } }) {
    const { hello, world, id } = props.row;
    const { editLoading, onEdit } = useEditInject();
    return () => (
      <el-button
        type="primary"
        size="mini"
        loading={editLoading.value.includes(id)}
        onClick={() => onEdit(id)}
      >
        {hello} {world}
      </el-button>
    );
  },
});
