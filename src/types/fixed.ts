export interface FixedSizeListProps {
  /** 高度 */
  height: number
  /** item尺寸*/
  itemSize: number
  /** 列表长度 */
  itemCount: number
  /** 主轴方向上额外渲染的数量 */
  extraRenderNumber?: number
}