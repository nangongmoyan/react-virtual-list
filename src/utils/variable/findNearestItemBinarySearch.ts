export function findNearestItemBinarySearch (offsets:number[], offset: number){
  if(offsets.length < 1) return -1

  /** 低位下标、高位下标 */
  let low = 0, high = offsets.length - 1

  while(low <= high){
    /** 中间下标 */
    const middle = Math.floor((low + high) / 2)
    if(offset === offsets[middle]){
      return middle
    }else if(offset < offsets[middle]){
      high = middle - 1
    }else if(offset > offsets[middle]){
      low = middle + 1
    }
  }
  if(low > 0){
    return low -1
  }else {
    return 0
  }
}