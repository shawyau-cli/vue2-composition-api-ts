<template>
  <div class="about">
    <h1>This is an about page</h1>
    <cus-table
      :columns="column"
      :data="tableData"
      :loading="bindings.loading"
      :total="bindings.total"
      :current-page.sync="serchForm.currPage"
      :page-size.sync="serchForm.pageSize"
      @size-change="bindings.handleSizeChange"
      @current-change="bindings.handleCurrentChange"
    />
  </div>
</template>

<script lang="tsx">
import {
  defineComponent,
  inject,
  provide,
  reactive,
  ref,
} from '@vue/composition-api';
import CusTable from '@/components/CusElTable/CusTable.vue';
import { ListParam } from './data';
import { usePages } from '@/composables/usePages';
import { CusTableColumn } from '@/components/CusElTable/data';
import { useEditProvide } from './composables/useEditContext';
import EditButton from './components/EditButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockList = async (data: ListParam): Promise<any> => {
  return new Promise((resolve) => {
    console.log(data);
    setTimeout(() => {
      let ary = [{ hello: 'hi', world: 'wd' }];
      const adds: { hello: string; world: string; id: string }[] = [];
      for (let index = 0; index < 60; index++) {
        adds.push({
          id: Math.random().toString(),
          hello: 'hello' + index,
          world: 'world' + index,
        });
      }
      ary = ary.concat(adds);
      resolve({
        code: 10,
        data: {
          list: ary.slice(0, data.pageSize),
          total: 60,
        },
      });
    }, 1500);
  });
};

const helloCell = defineComponent({
  name: 'HelloCell',
  props: {
    row: {
      type: Object,
    },
  },
  setup(props: { row: { hello: string } }) {
    const hello = props.row.hello;
    const deleteRow = inject('deleteRow');
    return () => (
      <el-button type="primary" size="mini" onClick={deleteRow}>
        {hello}
      </el-button>
    );
  },
});

export default defineComponent({
  name: 'About',
  components: {
    CusTable,
  },
  setup() {
    useEditProvide();

    const serchForm = reactive<ListParam>({
      name: '',
      age: 0,
      currPage: 1,
      pageSize: 10,
    });

    const { tableData, bindings } = usePages(serchForm, mockList);

    const deleteRow = () => {
      alert(22);
    };
    provide('deleteRow', deleteRow);
    const column = ref<CusTableColumn[]>([
      { label: 'Hello', prop: 'hello', comp: helloCell },
      { label: 'World', prop: 'world', minWidth: '180' },
      { label: '编码', prop: 'id', comp: EditButton },
    ]);
    const data = [
      { hello: 'hi', world: 'wd', id: '1' },
      { hello: 'hello', world: 'world', id: '10' },
    ];
    tableData.value = data;
    bindings.total = 14;

    return {
      column,
      serchForm,
      tableData,
      bindings,
    };
  },
});
</script>
