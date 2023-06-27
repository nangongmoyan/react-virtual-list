import { InstanceProps, VariableSizeListProps } from "../../components/VariableSizeList";
export function getEstimatedTotalSize (props: VariableSizeListProps, instanceProps:InstanceProps){

  /** 测量过的总高度 */
  let totalSizeOfMeasuredItems = 0

  const { itemCount } = props
  const { lastMeasuredIndex, itemMetadataMap , estimatedItemSize} = instanceProps

  if(lastMeasuredIndex >= 0){
    const itemMetadata = itemMetadataMap[lastMeasuredIndex]
    /** 我们只需要知道最后一个测量的元素即可知道实际测量的偏移量 */
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size
  }

  /** 未测量过的条目数 */
  const numUnMeasuredItems = itemCount -lastMeasuredIndex - 1 

  const totalSizeOfUnMeasuredItems = numUnMeasuredItems * estimatedItemSize

  /** 测量过的真实高度 + 未测量的预估高度 */
  return totalSizeOfMeasuredItems + totalSizeOfUnMeasuredItems
}