import React from "react";
import { useRangeForFixed } from "../hooks/useRangeForFixed";
import { flushSync } from "react-dom";
import { FixedSizeListProps } from "../types/fixed";

export interface Props extends  FixedSizeListProps {
  children: any
}

const FixedSizeList:React.FC<Props> = ({children: Component,...props}) => {

  const {  itemCount, height, itemSize } = props


  /** 内容高度 */
  const contentHeight = itemSize * itemCount

  /** 需要渲染的items */
  const items = []

  /** 获取起始和终点索引 */
  const {startIndex, endIndex, setScrollTop } = useRangeForFixed(props)

  /** 列表长度大于0，对每一项进行处理 */
  if(itemCount > 0){
    for(let i = startIndex; i< endIndex; i++){
      items.push(
        <Component 
          key={i} 
          index={i} 
          style={{
            left: 0,
            width: '100%',
            height: itemSize,
            top: i * itemSize,
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
      }}
      onScroll={(e)=>{
        flushSync(()=>{
          // @ts-ignore
          setScrollTop(e.target.scrollTop)
        })
      }}
    >
      {/* contentHeight为内容高度 */}
      <div style={{ height: contentHeight }} >
        {items}
      </div>
    </div>
  )
}

export { FixedSizeList }