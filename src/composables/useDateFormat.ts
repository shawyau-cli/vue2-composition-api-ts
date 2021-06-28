import dayjs, { ConfigType } from 'dayjs';

/**
 * 格式日期、时间
 * @param date 日期、时间
 * @param formatPattern 格式，默认YYYY-MM-DD HH:mm:ss
 * @returns 返回格式化后的时间
 */
export default function (
  date: ConfigType,
  formatPattern = 'YYYY-MM-DD HH:mm:ss',
): string {
  const dayjsDate = typeof date === 'number' ? dayjs.unix(date) : dayjs(date);
  return dayjsDate.format(formatPattern);
}
