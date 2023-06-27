import React from "react";
import { useRangeToRender } from "../hooks/useRangeToRender";
import { flushSync } from "react-dom";

export interface FixedSizeListProps {
  /** item尺寸*/
  itemSize: number
  /** 列表长度 */
  itemCount: number
  /** 高度 */
  height: number
  children: any
}

const FixedSizeList:React.FC<FixedSizeListProps> = ({children: Component,...props}) => {

  const {  itemCount, height, itemSize } = props


  /** 内容高度 */
  const contentHeight = itemSize * itemCount

  /** 需要渲染的items */
  const items = []

  const {startIndex, endIndex, setScrollTop } = useRangeToRender(props)
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

export { FixedSizeList }