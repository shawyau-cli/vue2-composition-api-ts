import { Dictionary } from './base';

/**
 * 分页查询基础参数
 */
export interface PaginationSearch {
  /**
   * 当前页页码
   */
  currPage: number;
  /**
   * 每页条数
   */
  pageSize: number;
}

/**
 * 分页组件
 */
export interface PaginationComponent {
  /**
   * 总数
   */
  total: number;
  /**
   * 加载数据loading
   */
  loading?: boolean;
  /**
   * pageSize 改变时方法
   */
  handleSizeChange?: (val: number) => void;
  /**
   * currentPage 改变时方法
   */
  handleCurrentChange?: (val: number) => void;
}

/**
 * 分页composables返回类型
 */
export interface UsePagesReturnType {
  /**
   * 表格数据
   */
  tableData: Ref<Dictionary[]>;
  /**
   * 分页组件绑定数据
   */
  bindings: PaginationComponent;
}
