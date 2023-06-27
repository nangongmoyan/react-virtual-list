import { InstanceProps , VariableSizeListProps} from "../../components/VariableSizeList";

export function getItemMetadata (props: VariableSizeListProps, index: number, instanceProps: InstanceProps) {

  const { itemSize } = props
  const { itemMetadataMap, lastMeasuredIndex } = instanceProps

  /** 当前获取的条目比上一次测量过的索引大，说明此条目没有测量过（都是从上往下滚动的） */


  if(index > lastMeasuredIndex){ // 没有缓存过

    /** 通过上一个测量过的条目，计算当前条目的offset */

    let offset = 0

    /** lastMeasuredIndex之前的索引做过缓存 */
    if(lastMeasuredIndex > 0){
  
      const itemMetadata = itemMetadataMap[lastMeasuredIndex]
      /**  下一条offset的值 */
      offset = itemMetadata.offset + itemMetadata.size
    }

    
    for(let i = lastMeasuredIndex + 1; i <= index; i++){
      /** 此条目对应的高度 */
      let size = itemSize(i)
      itemMetadataMap[i] = { offset, size }

      /** 下一个条目的offset是当前的offset+ size */
      offset += size
    }
    /** 重新赋值lastMeasuredIndex */
    instanceProps.lastMeasuredIndex = index
  }
  /** 虽然返回的是房钱索引的信息，但其实小于等于index的元素信息都已经被计算存储了 */
  return itemMetadataMap[index]
}