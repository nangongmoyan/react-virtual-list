export interface VariableSizeListProps {
  /** 高度 */
  height: number
  /** 列表长度 */
  itemCount: number
  /** 主轴方向上额外渲染的数量 */
  extraRenderNumber?: number
  /** 获取item内容高度 */
  getItemHeight:(index: number) => number
}


export type RangeForVariable = Omit<VariableSizeListProps,'getItemHeight'> & {
  offsets: number[]
}