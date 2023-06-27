/**
 * 获取结束索引
 * @param {number} itemSize itemSize
 * @param {number} offset 上滑的距离
 * @param {number} containerHeight 可视窗口大小
 * @returns {number} 结束索引
 */
export  function getEndIndexForOffset (itemSize:number, offset: number, containerHeight: number) {
  return Math.floor((containerHeight + offset) / itemSize)
}