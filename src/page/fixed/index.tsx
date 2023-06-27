import React from "react";
import { FixedSizeList } from "../../components/FixedSizeList";
import '../../styles.css'
function Item({ style, index }:{style:React.CSSProperties, index:number}) {
  return (
    <div
      className="item"
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue'
      }}
    >
      {index}
    </div>
  );
}


const Fixed = () => {
  const list = new Array(10000).fill(0).map((item, i) => i);

  return (
    <>
      <p style={{textAlign:'center'}}>列表项高度固定 - 虚拟列表实现</p>
      <FixedSizeList
        height={300}
        itemCount={list.length}
        itemSize={50}
      >
        {Item}
      </FixedSizeList>
    </>
  )
}

export { Fixed }