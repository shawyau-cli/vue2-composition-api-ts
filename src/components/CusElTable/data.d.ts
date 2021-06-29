import { ElTable, cellCallbackParams } from 'element-ui/types/table';
import { VueConstructor } from 'vue/types/umd';

/**
 * Element-ui表格组件Props属性
 */
type CusElTable = Omit<
  ElTable,
  | 'clearSelection'
  | 'toggleRowSelection'
  | 'toggleAllSelection'
  | 'setCurrentRow'
  | 'toggleRowExpansion'
  | 'clearSort'
  | 'clearFilter'
  | 'doLayout'
  | 'sort'
>;

/**
 * 字典集合
 */
export interface Dictionary {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | unknown
    | Dictionary;
}

/**
 * 表头配置项
 */
export interface CusTableColumn {
  /**
   * 显示的标题
   */
  label?: string;
  /**
   * 列内容的字段名
   */
  prop?: string;
  /**
   * 列宽
   */
  with?: string;
  /**
   * 列最小宽
   */
  minWidth?: string;
  /**
   * 列是否固定在左侧或者右侧，true 表示固定在左侧
   */
  fixed?: boolean | 'left' | 'center' | 'right';
  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 当内容过长被隐藏时显示 tooltip
   */
  showOverflowTooltip?: boolean;

  comp?: VueConstructor<Vue>;
}

/**
 * 合并行或列的计算方法
 */
export type SpanMethodReturn = (
  param: cellCallbackParams,
) => number[] | { rowspan: number; colspan: number };

/**
 * 渲染嵌套数据的配置选项
 */
export interface TreeProps {
  hasChildren: string;
  children: string;
}

/**
 * 表格组件Props参数
 */
export interface CusTableProps extends CusElTable {
  loading: boolean;
  index: boolean;
  multiple: boolean;
  columns: CusTableColumn[];
  spanMethod: SpanMethodReturn;
  treeProps: TreeProps;
  layout: string;
  pageSizes: number[];
  currentPage: number;
  pageSize: number;
  total: number;
  background: boolean;
  disabled: boolean;
  hideOnSinglePage: boolean;
}
