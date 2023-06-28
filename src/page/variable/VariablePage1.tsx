import React, { useEffect, useRef } from 'react'
import { faker } from '@faker-js/faker';
import { VariableSizeList1 } from '../../components/VariableSizeList1';

function Item({ index, data, setHeight }:{index:number, data:any, setHeight:(index:number, height:number)=>void}) {
  const itemRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    //@ts-ignore
    setHeight(index, itemRef.current.getBoundingClientRect().height);
  }, [setHeight, index]);

  return (
    <div
      ref={itemRef}
      style={{
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue'
      }}
    >
      {data[index]}
    </div>
  );
}

const VariablePage1 = () => {
  
  const list = new Array(1000).fill(0).map(() => faker.lorem.paragraph())
  
  const listRef = useRef();

  const heightsRef = useRef(new Array(100));
  // 预估高度
  const estimatedItemHeight = 40;
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
      <VariableSizeList1
        ref={listRef}
        containerHeight={window.innerHeight}
        itemCount={list.length}
        getItemHeight={getHeight}
        itemData={list}
      >
        {({ index, style, data } :{index:number, style:React.CSSProperties, data:any}) => {
          return (
            <div style={style}>
              <Item {...{ index, data }} setHeight={setHeight} />
            </div>
          );
        }}
      </VariableSizeList1>
    </>
  )
}

export { VariablePage1 }