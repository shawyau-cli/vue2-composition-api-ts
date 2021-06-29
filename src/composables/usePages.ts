import { Dictionary } from '@/types/base';
import {
  PaginationComponent,
  PaginationSearch,
  UsePagesReturnType,
} from '@/types/pagination';
import { reactive, ref } from '@vue/composition-api';

/**
 * 配合分页组件使用
 * @param query 查询条件
 * @param axiosFunc axios请求方法
 */
export const usePages = <T extends PaginationSearch>(
  query: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosFunc: (params: T) => Promise<any>,
): UsePagesReturnType => {
  // 表格数据
  const tableData = ref<Dictionary[]>([]);

  // 分页组件绑定
  const bindings = reactive<PaginationComponent>({
    total: 0,
    loading: false,
  });

  let currentChangeFlag = false;

  /**
   * 请求方法
   * @param searchForm 查询条件
   */
  const reqData = async (searchForm: T): Promise<void> => {
    try {
      bindings.loading = true;
      const {
        data: { list, total },
      } = await axiosFunc(searchForm);
      bindings.loading = false;
      tableData.value = list;
      bindings.total = total;
    } catch (error) {
      bindings.loading = false;
    }
  };

  /**
   * 改变页码方法
   * @param val 当前页码
   */
  const handleCurrentChange = async (val: number): Promise<void> => {
    if (currentChangeFlag) return;
    query.currPage = val;
    await reqData(query);
  };

  bindings.handleCurrentChange = handleCurrentChange;

  /**
   * 改变页数
   * @param val 当前页数
   */
  const handleSizeChange = async (val: number): Promise<void> => {
    currentChangeFlag = true;
    query.pageSize = val;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currPage, ...params } = JSON.parse(JSON.stringify(query));
    params.currPage = 1;
    await reqData(params);
    query.currPage = 1;
    currentChangeFlag = false;
  };

  bindings.handleSizeChange = handleSizeChange;

  return {
    tableData,
    bindings,
  };
};
