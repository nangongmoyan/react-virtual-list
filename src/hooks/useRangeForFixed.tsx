import React, { useMemo, useState } from "react";
import { getStartIndexForOffset } from "../utils/fixed/getStartIndexForOffset";
import { getEndIndexForOffset } from "../utils/fixed/getEndIndexForOffset";
import { FixedSizeListProps } from "../components/FixedSizeList";


type RangeForFixed = Omit<FixedSizeListProps,'children'>
const useRangeForFixed = ({itemSize, height, itemCount}:RangeForFixed) => {
  const overscanCount = 2

  /** 滚动位置 */
  const [scrollTop, setScrollTop] = useState(0); 

  /**
   * 需要渲染的item索引由哪些
   * 并在上下额外多渲染几个item，解决滚动时来不及加载元素出现短暂的空白区域问题
   * 注意处理越界情况 
   */
  const startIndex = useMemo(()=>{
    return  Math.max(getStartIndexForOffset(itemSize, scrollTop) - overscanCount, 0)
  },[itemSize, scrollTop])

  const endIndex = useMemo(()=>{
    return   Math.min(getEndIndexForOffset(itemSize, scrollTop, height ) + overscanCount, itemCount - 1)
  },[height, itemCount, itemSize, scrollTop])

  return { startIndex, endIndex, setScrollTop }
}

export { useRangeForFixed }