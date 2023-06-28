import React from "react";
import { FixedSizeList } from "react-window";
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


const FixedForWindow = () => {
  const list = new Array(10000).fill(0).map((item, i) => i);

  return (
    <>
      <p style={{textAlign:'center'}}>列表项高度固定 - react-window</p>
      <FixedSizeList
        height={window.innerHeight}
        itemCount={list.length}
        itemSize={50}
        width={window.innerWidth}
      >
        {Item}
      </FixedSizeList>
    </>
  )
}

export { FixedForWindow }