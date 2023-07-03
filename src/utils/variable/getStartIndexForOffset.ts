import { InstanceProps ,VariableSizeListProps} from "../../components/VariableSizeList2";
import { getItemMetadata } from "./getItemMetadata";
export function getStartIndexForOffset (props: VariableSizeListProps, offset: number, instanceProps: InstanceProps){

  const { lastMeasuredIndex } = instanceProps
  /** 这里从0开始到lastMeasuredIndex进行分割查找，每次查找会少一半 */
  return findNearestItemBinarySearch(props, instanceProps, lastMeasuredIndex, 0, offset)
}

export function findNearestItemBinarySearch (props: VariableSizeListProps, instanceProps: InstanceProps, high: number, low: number, offset: number){


  while(low <= high){
    const middle = low + Math.floor((high - low) / 2)
    const currentOffset = getItemMetadata(props, middle, instanceProps).offset

    if(currentOffset === offset){
      return middle
    }else if(currentOffset < offset){
      low = middle + 1
    }else if(currentOffset > offset){
      high = middle - 1 
    }
  }

  if(low > 0){
    return low -1
  }else {
    return 0
  }
}