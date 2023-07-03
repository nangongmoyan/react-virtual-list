import React from "react";
import { FixedSizeList } from "../../components/FixedSizeList";
import '../../styles.css'
function Item({ style, index }:{style:React.CSSProperties, index:number}) {
  return (
    <div
      className="item"
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? '#282c34' : '#087ea4',
        color:'#FFF',
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
        height={window.screen.availHeight}
        itemCount={list.length}
        itemSize={50}
      >
        {Item}
      </FixedSizeList>
    </>
  )
}

export { Fixed }