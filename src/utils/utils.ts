/**
 * await睡
 * @param {number} duration 时间(毫秒单位)
 * @returns
 */
export function sleep(duration: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), duration || 1500);
  });
}

/**
 * 存储session数据
 * @param {string} key
 * @param {any} value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setSession(key: string, value: any): void {
  if (typeof value == 'object') {
    //如果要存储对象，则先转为json串
    value = window.JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
}

/**
 * 获取session值
 * @param {string} key
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSession(key: string): any {
  const value = sessionStorage.getItem(key); //字符串或json串
  if (value) {
    try {
      const json = window.JSON.parse(value); //json串转为js对象

      if (typeof json == 'object' && json) {
        //利用了一点，当符合json格式，串会成功转为js对象，否则为null
        return json;
      }
      return value;
    } catch (e) {
      return value;
    }
  } else {
    return value;
  }
}

/**
 * 移除session值
 * @param {string} key
 */
export function removeSession(key: string): void {
  sessionStorage.removeItem(key);
}

/**
 * 清除所有session
 */
export function clearSession(): void {
  sessionStorage.clear();
}

/**
 * 判断session是否存在key
 * @param {*} key
 * @returns
 */
export function hasKey(key: string): boolean {
  //session中是否存在指定key
  if (getSession(key) == '') return false;
  return true;
}

/**
 * 移除空值对象
 * @param {Object<>} obj
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeNullOrEmpty(obj: { [x: string]: any }): any {
  if (Object.keys(obj).length <= 0) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: { [x: string]: any } = {};
  for (const key in obj) {
    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      data[key] = obj[key];
    }
  }
  return data;
}
