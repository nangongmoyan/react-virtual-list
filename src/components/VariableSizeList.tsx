import React, { useMemo } from "react";
import { useRangeForVariable } from "../hooks/useRangeForVariable";
import { flushSync } from "react-dom";
import { getEstimatedTotalSize } from "../utils/variable/getEstimatedTotalSize";
import { getItemMetadata } from "../utils/variable/getItemMetadata";

const DEFAULT_ESTIMATED_SIZE = 50


interface ItemMetadata {
  /** */
  size: number
  /** */
  offset: number
}

export interface InstanceProps {
  /** */
  estimatedItemSize: number
  /** */
  lastMeasuredIndex: number
  /** */
  itemMetadataMap: { [index:number]: ItemMetadata}

}
export interface VariableSizeListProps {
  /** 预估条目高度 */
  estimatedItemSize?: number

  /**  */
  height: number

  /** */
  itemCount: number
  
  children: any

  itemSize: (index: number) => number
}

const VariableSizeList:React.FC<VariableSizeListProps> = (props) => {

  const { estimatedItemSize, height, itemCount , children: Component} = props
  const instanceProps: InstanceProps = useMemo(()=>{
    return {
      /** 记录每个条目的信息 */
      itemMetadataMap: {},
      /** 用来记录那条数据被渲染过了，计算过的可以直接用缓存的值 */
      lastMeasuredIndex: -1,
      estimatedItemSize: estimatedItemSize|| DEFAULT_ESTIMATED_SIZE
    }
  },[estimatedItemSize])
  
  console.log({instanceProps})


  const {startIndex, endIndex, setScrollTop } = useRangeForVariable(props, instanceProps)


  const contentHeight = useMemo(()=>{
    return getEstimatedTotalSize(props, instanceProps)
  },[instanceProps, props])

    /** 需要渲染的items */
  const items = []

    /** 列表长度大于0，对每一项进行处理 */
    if(itemCount > 0){
      for(let i = startIndex; i< endIndex; i++){
        const {size:height, offset:top} = getItemMetadata(props, i, instanceProps)
        items.push(
          <Component 
            key={i} 
            index={i} 
            style={{
              top,
              height,
              left: 0,
              width: '100%',
              position: 'absolute',
            }}
          />)
      }
    }



  return (
    <div 
      style={{
        height,
        overflow:'auto',
        position:'relative',
        // willChange: "transform",
      }}
      onScroll={(e)=>{
        flushSync(()=>{
          // @ts-ignore
          setScrollTop(e.target.scrollTop)
        })
      }}
    >
      <div style={{ height: contentHeight }} >
        {items}
      </div>
    </div>
  )
}

export { VariableSizeList }
