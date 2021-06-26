import iconsvg from './IconSvg.vue';

/**
 * 自动导入 assets/iconsvg 下svg文件
 */
export function importAllSvg(): void {
  try {
    const requireContext: __WebpackModuleApi.RequireContext = require.context(
      '../../assets/iconsvg',
      false,
      /\.svg$/,
    );
    requireContext.keys().forEach(requireContext);
  } catch (error) {
    console.log(error);
  }
}

export default iconsvg;
