import { Ref } from '@vue/composition-api';
import { PaginationSearch } from '@/types/pagination';

export interface ListParam extends PaginationSearch {
  name: string;
  age: number;
}

export interface EditContext {
  editLoading: Ref<string[]>;
  onEdit: (id: string) => void;
}
