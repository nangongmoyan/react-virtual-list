/**
 * 获取开始索引
 * @param {number} itemSize itemSize 
 * @param {number} offset 上滑的距离
 * @returns {number} 开始索引
 */
export function getStartIndexForOffset (itemSize:number, offset: number) {
  return Math.floor(offset / itemSize)
}