import { sleep } from '@/utils/utils';
import { inject, provide, ref } from '@vue/composition-api';
import { Message } from 'element-ui';
import { EditContext } from '../data';

const EditSymbol = Symbol('edit');

export const useEditProvide = (): void => {
  const editLoading = ref<string[]>([]);

  const onEdit = async (id: string) => {
    console.log(id, 'id');

    editLoading.value = [id];
    await sleep(1000);
    Message.success('编辑成功');
    editLoading.value = [];
  };

  provide(EditSymbol, {
    editLoading,
    onEdit,
  });
};

export const useEditInject = (): EditContext => {
  const editContext = inject<EditContext>(EditSymbol);

  if (!editContext) {
    throw new Error('useEditInject must be used after useEditProvide');
  }

  return editContext;
};
