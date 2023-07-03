import React, { useEffect, useRef } from 'react'
import { faker } from '@faker-js/faker';
import { VariableSizeList } from '../../components/VariableSizeList';


interface ItemProps {
  data:any
  index:number
}

interface Props  extends ItemProps{
  setHeight:(index:number, height:number)=>void
}

const Item:React.FC<Props> = ({index, data, setHeight })=>{
  const itemRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    //@ts-ignore
    setHeight(index, itemRef.current.getBoundingClientRect().height);
  }, [setHeight, index]);

  return (
    <div
      ref={itemRef}
      style={{
        backgroundColor: index % 2 === 0 ? '#282c34' : '#087ea4',
        color:'#FFF'
      }}
    >
      {data}
    </div>
  );
}

const Variable = () => {
  
  const list = new Array(1000).fill(0).map(() => faker.lorem.paragraph())
  
  const listRef = useRef();

  /** 高度数组，在列表项渲染完成时更新 */
  const heightsRef = useRef(new Array(100));

  /** 预估高度 */
  const estimatedItemHeight = 40;

  /** 获取列表项的高度 */
  const getHeight = (index:number) => {
    return heightsRef.current[index] ?? estimatedItemHeight;
  };

  const setHeight = (index:number, height:number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      // 让 VariableSizeList 组件更新高度
      // @ts-ignore
      listRef.current.resetHeight();
    }
  };
  return (
    <>
      <p style={{textAlign:'center'}}>  列表项高度动态 - 虚拟列表实现</p>
      <VariableSizeList
        ref={listRef}
        itemCount={list.length}
        getItemHeight={getHeight}
        height={window.innerHeight}
      >
        {({ index, style } :{index:number, style:React.CSSProperties}) => {
          return (
            <div style={style}>
              <Item index={index} data={list[index]} setHeight={setHeight} />
            </div>
          );
        }}
      </VariableSizeList>
    </>
  )
}

export { Variable }