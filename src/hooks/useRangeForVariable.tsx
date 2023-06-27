import React, { useMemo, useState } from "react";
import { getStartIndexForOffset } from "../utils/variable/getStartIndexForOffset";
import { InstanceProps, VariableSizeListProps } from "../components/VariableSizeList";
import { getEndIndexForOffset } from "../utils/variable/getEndIndexForOffset";


const useRangeForVariable = (props: VariableSizeListProps,instanceProps: InstanceProps ) => {
   const overscanCount = 2

     /** 滚动位置 */
  const [scrollTop, setScrollTop] = useState(0); 
  
  const startIndex = useMemo(()=>{
    return  Math.max(getStartIndexForOffset(props, scrollTop, instanceProps) - overscanCount, 0)
  },[instanceProps, props, scrollTop])
  

  const endIndex = useMemo(()=>{
    return  Math.max(getEndIndexForOffset(props, startIndex, instanceProps) - overscanCount, 0)
  },[startIndex, instanceProps, props])


  return { startIndex, endIndex,  setScrollTop }
}

export { useRangeForVariable }