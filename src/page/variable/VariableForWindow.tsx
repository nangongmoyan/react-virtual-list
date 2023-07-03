import React, { createRef, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { faker } from '@faker-js/faker';
import { VariableSizeList } from 'react-window';
interface Props {

}


function Item({ index, data, setRefs }:{index:number, data:any, setRefs:(index:number, ref:React.RefObject<HTMLInputElement>)=>void}) {
  const itemRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setRefs(index, itemRef)
  },[index, itemRef, setRefs])
  // useEffect(() => {
  //   //@ts-ignore
  //   setHeight(index, itemRef.current.getBoundingClientRect().height);
  // }, [setHeight, index]);

  return (
    <div
      ref={itemRef}
      style={{
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue'
      }}
    >
      {data}
    </div>
  );
}

const VariableForWindow = () => {
  const list = new Array(10).fill(0).map(() => faker.lorem.paragraph())

  const [elRefs, setElRefs] = useState<{ index: string; ref: React.RefObject<HTMLInputElement> }[]>(()=>{
    return list.map((index)=>({index, ref:createRef<HTMLInputElement>() }))
  })

  const setRefs = useCallback((i:number, ref:React.RefObject<HTMLInputElement>)=>{
    setElRefs((oldElRefs)=>{
      return oldElRefs.map((item, index)=>{
        if(index!==i) return item
        return {...item, ref}
      })
    })
  },[])

  const getHeight = (index:number) => {
    return elRefs[index].ref.current?.getBoundingClientRect()?.height ?? 40
  };


  return (
    <VariableSizeList
      itemCount={list.length}
      itemSize={getHeight}
      height={window.innerHeight}
      width={window.innerWidth}
    >
        {({ index, style } :{index:number, style:React.CSSProperties}) => {
          return (
            <div style={style}>
              <Item {...{ index, data:list[index] }}  setRefs={setRefs}/>
            </div>
          );
        }}
    </VariableSizeList>
  )
}

export { VariableForWindow }