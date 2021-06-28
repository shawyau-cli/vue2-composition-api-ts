<template>
  <div class="about">
    <h1>This is an about page</h1>
    <cus-table :tableColumns="column" :data="data" />
  </div>
</template>

<script lang="tsx">
import { defineComponent, inject, provide } from '@vue/composition-api';
import CusTable from '@/components/CusElTable/CusTable.vue';

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
    const deleteRow = () => {
      alert(22);
    };
    provide('deleteRow', deleteRow);
    const column = [
      { label: 'Hello', key: 'hello', comp: helloCell },
      { label: 'World', key: 'world' },
    ];
    const data = [
      { hello: 'hi', world: 'wd' },
      { hello: 'hello', world: 'world' },
    ];

    return {
      column,
      data,
    };
  },
});
</script>
