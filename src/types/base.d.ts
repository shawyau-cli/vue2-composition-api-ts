/**
 * ε­εΈιε
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
