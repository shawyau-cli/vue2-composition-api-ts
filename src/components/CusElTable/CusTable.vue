<template>
  <div class="table-wrap">
    <el-table
      v-loading="loading"
      class="cus-table"
      ref="elTableRef"
      :data="data"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="multiple"
        type="selection"
        width="60"
        :selectable="handleSelectable"
      ></el-table-column>
      <el-table-column v-if="index" type="index" width="60"></el-table-column>
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : ''"
          :min-width="column.minWidth ? column.minWidth : ''"
          :fixed="column.fixed ? column.width : false"
          :align="column.align ? column.align : 'left'"
          :show-overflow-tooltip="!column.multipleline"
        >
          <template slot-scope="scope">
            <table-cell
              v-if="column.comp"
              :scope="scope"
              :comp="column.comp"
            ></table-cell>
            <span v-else>{{ scope.row[column.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      class="cus-pagination"
      :background="background"
      :disabled="disabled"
      :hide-on-single-page="hideOnSinglePage"
      :layout="layout"
      :page-sizes="pageSizes"
      :current-page.sync="currentPageValue"
      :page-size.sync="pageSizeValue"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from '@vue/composition-api';
import { ElTable } from 'element-ui/types/table';
import { CusTableProps, Dictionary } from './data';
import TableCell from './TableCell';
export default defineComponent<CusTableProps>({
  name: 'CusTable',
  components: {
    TableCell,
  },
  emits: [
    'select',
    'select-all',
    'selection-change',
    'current-change',
    'size-change',
    'selectable',
  ],
  props: {
    //#region 自定义属性
    // 加载loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 显示序号
    index: {
      type: Boolean,
      default: true,
    },
    // 多选框
    multiple: {
      type: Boolean,
      default: false,
    },
    // 表头列
    columns: {
      type: Array,
      default: () => [],
    },
    // 显示分页组件
    pagination: {
      type: Boolean,
      default: true,
    },
    // 分页组件布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: Number,
    // 是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: true,
    },
    // 分页是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 只有一页时是否隐藏
    hideOnSinglePage: Boolean,
    //#endregion
    data: {
      type: Array,
      default: () => [],
    },
    height: [String, Number],
    maxHeight: [String, Number],
    stripe: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
    size: String,
    fit: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    currentRowKey: [String, Number],
    rowClassName: [Function, String],
    rowStyle: [Function, Object],
    cellClassName: [Function, String],
    cellStyle: [Function, Object],
    headerRowClassName: [Function, String],
    headerRowStyle: [Function, Object],
    headerCellClassName: [Function, String],
    headerCellStyle: [Function, Object],
    rowKey: [Function, String],
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    expandRowKeys: Array,
    defaultSort: Object,
    tooltipEffect: String,
    showSummary: {
      type: Boolean,
      default: false,
    },
    sumText: {
      type: String,
      default: '合计',
    },
    summaryMethod: Function,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    indent: {
      type: Number,
      default: 16,
    },
    lazy: Boolean,
    load: Function,
    treeProps: {
      type: Object,
      default: () => {
        return { hasChildren: 'hasChildren', children: 'children' };
      },
    },
  },
  setup(props, { emit }) {
    const elTableRef: Ref<ElTable | null> = ref(null);

    const currentPageValue = computed<number>({
      get: () => props.currentPage,
      set: (val) => {
        emit('update:currentPage', val);
      },
    });

    const pageSizeValue = computed<number>({
      get: () => props.pageSize,
      set: (val) => {
        emit('update:currentPage', val);
      },
    });

    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    const handleSelect = (selection: Dictionary, row: Dictionary) =>
      emit('select', selection, row);

    // 当用户手动勾选全选 Checkbox 时触发的事件
    const handleSelectAll = (selection: Dictionary) =>
      emit('select', selection);

    // 当选择项发生变化时会触发该事件
    const handleSelectionChange = (selection: Dictionary) =>
      emit('selection-change', selection);

    const handleSizeChange = (val: number) => emit('size-change', val);

    const handleCurrentChange = (val: number) => emit('current-change', val);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelectable = (row: any, index: number) =>
      emit('selectable', row, index);

    return {
      elTableRef,
      currentPageValue,
      pageSizeValue,
      handleSelect,
      handleSelectAll,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      handleSelectable,
    };
  },
});
</script>

<style lang="scss" scoped>
.cus-table {
  width: 100%;
}
</style>
