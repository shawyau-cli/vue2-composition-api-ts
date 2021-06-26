import { Ref, ref } from '@vue/composition-api';

interface mockGetDataReturn {
  getData: (list: Ref<any[]>) => void;
}

export function mockGetData(): mockGetDataReturn {
  function getData(list: Ref<any[]>) {
    setTimeout(() => {
      list.value = [{ name: '5686', age: 25 }];
    }, 1000);
  }
  return {
    getData,
  };
}
