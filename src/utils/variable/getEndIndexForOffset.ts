import { InstanceProps, VariableSizeListProps } from "../../components/VariableSizeList2";
import { getItemMetadata } from "./getItemMetadata";

export function getEndIndexForOffset (props: VariableSizeListProps, startIndex: number, instanceProps: InstanceProps){

  /** 拿到可视区域的高度和元素数量 */
  const { height, itemCount } = props
  /** 获取开始索引对应的数据、offset、size */
  const itemMetadata = getItemMetadata(props, startIndex, instanceProps)
  
  /** 最大的offset */
  const maxOffset = itemMetadata.offset + height

  /** startIndex下一个元素的offset */
  let offset = itemMetadata.offset + itemMetadata.size

  let endIndex = startIndex
  /** 因为不确定科室区域内有多少元素，所以需要从当前开始每次加一个元素进行计算 */
  while(endIndex < itemCount - 1 && offset < maxOffset){
    endIndex++
    /** 加每个条目的高度 */
    offset += getItemMetadata(props, endIndex, instanceProps).size
  }
  /** 当超出总数量或者offset偏移量超出maxOffset时抛出 */
  return endIndex
}