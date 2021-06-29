import { PaginationSearch } from '@/types/pagination';

export interface ListParam extends PaginationSearch {
  name: string;
  age: number;
}
