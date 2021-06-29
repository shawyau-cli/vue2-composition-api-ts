import { Ref } from '@vue/composition-api';

interface mockGetDataReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData: (list: Ref<any[]>) => void;
}

export function mockGetData(): mockGetDataReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getData(list: Ref<any[]>) {
    setTimeout(() => {
      list.value = [{ name: '5686', age: 25 }];
    }, 1000);
  }
  return {
    getData,
  };
}
