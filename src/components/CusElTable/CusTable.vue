<template>
  <div class="table-base">
    <div class="table-container">
      <el-table
        :size="size"
        v-loading="loading"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="multiple"
          type="selection"
          width="55"
          :selectable="checkSelectable"
        ></el-table-column>
        <el-table-column
          v-if="showIndex"
          type="index"
          width="55"
        ></el-table-column>
        <template v-for="(column, index) in tableColumns">
          <el-table-column
            v-if="column.comp"
            :key="index"
            :prop="column.key"
            :label="column.label"
            :width="column.width ? column.width : ''"
            :show-overflow-tooltip="!column.multipleline"
          >
            <template slot-scope="scope">
              <table-cell :scope="scope" :comp="column.comp"></table-cell>
            </template>
          </el-table-column>
          <el-table-column
            :key="index"
            v-else-if="column.active"
            :prop="column.key"
            :label="column.label"
            :width="column.width ? column.width : ''"
            :show-overflow-tooltip="!column.multipleline"
          >
            <template slot-scope="scope">
              <span
                class="active-link"
                @click="() => handleClickActiveLink(scope.row)"
                >{{ scope.row[column.key] }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            :prop="column.key"
            :label="column.label"
            :width="column.width ? column.width : ''"
            :show-overflow-tooltip="!column.multipleline"
          ></el-table-column>
        </template>
      </el-table>
    </div>
    <div class="table-pagination" v-if="!noPagination">
      <el-pagination
        class="pagination"
        background
        :layout="layout"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import TableCell from './TableCell';
export default defineComponent({
  name: 'CusTable',
  components: {
    TableCell,
  },
  props: {
    showIndex: {
      type: Boolean,
      default: true,
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, jumper',
    },
    size: {
      type: String,
      default: 'small',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [],
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    noPagination: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSelectionChange = (val: any) => emit('selection-change', val);
    const handleSizeChange = (val: number) => emit('current-change', val);
    const handleCurrentChange = (val: number) => emit('current-change', val);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickActiveLink = ($event: MouseEvent, row: any) =>
      emit('get-row-info', $event, row);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkSelectable = (row: any) => row.name !== 'None';

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      handleClickActiveLink,
      checkSelectable,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-pagination {
  padding-top: 20px;
  .pagination {
    text-align: center;
  }
}
.table-container {
  & ::v-deep .el-table {
    font-size: 14px;
  }
}
// .table-container /deep/ {
//   .el-table {
//     font-size: 14px;
//   }
// }
</style>
