import { forwardRef, useState } from "react"
import { flushSync } from "react-dom"
import { VariableSizeListProps } from "../types/variable"
import { useRangeForVariable } from "../hooks/useRangeForVariable"


interface Props extends VariableSizeListProps {
  children:any
}


const VariableSizeList = forwardRef((props: Props, ref)=> {

  const { height, getItemHeight, itemCount, children: Component } = props 
  //@ts-ignore
  ref.current = {
    resetHeight: () => {
      setOffsets(genOffsets())
    }
  }

  /** 获取offsets */
  const genOffsets = () => {
    const a = [];
    a[0] = getItemHeight(0);
    for (let i = 1; i < itemCount; i++) {
      a[i] = getItemHeight(i) + a[i - 1]
    }
    return a;
  };

  /** 存储offsets */
  const [offsets, setOffsets] = useState(() => genOffsets())

  /** 内容高度 */
  const contentHeight = offsets[offsets.length - 1]

  /** 获取起始和终点索引 */
  const { startIndex , endIndex, setScrollTop } = useRangeForVariable({...props, offsets})

  /** 需要渲染的items */
  const items = []

  /** 列表长度大于0，对每一项进行处理 */
  if(itemCount > 0) {
    for (let i = startIndex; i <= endIndex; i++) {
      /** top为上一项offset的值 */
      const top = i === 0 ? 0 : offsets[i - 1]
      /** height为当前与上一项offset的差值 */
      const height = i === 0 ? offsets[0] : offsets[i] - offsets[i - 1]
      items.push(
        <Component
          key={i}
          index={i}
          style={{
            top,
            height,
            width: '100%',
            position: 'absolute',
          }}
        />
      );
    }
  }


  return (
    <div
      style={{
        height,
        overflow: 'auto',
        position: 'relative',
        willChange: "transform",
      }}
      onScroll={(e) => {
        flushSync(() => {
          // @ts-ignore
          setScrollTop(e.target.scrollTop);
        });
      }}
    >
      <div style={{ height: contentHeight }}>{items}</div>
    </div>
  )

})

export { VariableSizeList }