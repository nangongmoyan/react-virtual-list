import React, { useMemo, useState } from "react";
import { RangeForVariable } from "../types/variable";
import { findNearestItemBinarySearch } from "../utils/variable/findNearestItemBinarySearch";

const useRangeForVariable = ({ height, offsets,itemCount, extraRenderNumber = 2}: RangeForVariable) => {
  /** 滚动位置 */
  const [scrollTop, setScrollTop] = useState(0); 

  /**
   * 计算需要渲染的item起始和终点的索引值
   * extraRenderNumber是为了解决滚动时来不及加载元素出现短暂空白区域现象，故在主轴前后额外对渲染几个item
   * 备注：注意处理数组越界的情况
   */
  const startIndex = useMemo(()=>{
    /** 滚动距离/itemSize可以得知经过了多少个item，向下取整并减extraRenderNumber获取最开始的index */
    const start = findNearestItemBinarySearch(offsets, scrollTop)- extraRenderNumber
    /** 处理越界情况 */
    return Math.max(start, 0)
  },[extraRenderNumber, offsets, scrollTop])

  const endIndex = useMemo(()=>{
     /** (滚动距离+ 可视窗口大小)/itemSize可以得知最末尾需要经过了多少个item，向下取整并加extraRenderNumber获取最末尾的index */

     const end = findNearestItemBinarySearch(offsets, scrollTop + height) + extraRenderNumber
    /** 处理越界情况 */
    return Math.min(end, itemCount - 1)
  },[offsets, extraRenderNumber, itemCount, scrollTop, height])

  /** 返回渲染的前后index和更新scrollTop的函数 */
  return { startIndex, endIndex, setScrollTop }
}

export { useRangeForVariable }