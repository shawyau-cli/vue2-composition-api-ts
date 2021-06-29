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
