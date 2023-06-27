import React from "react";
import { VariableSizeList } from "../../components/VariableSizeList";


function Row({ index, style }:{index: number, style: React.CSSProperties}) {
  return (
    <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index}
    </div>
  );
}

const Variable = ()  => {
  const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 55))
  const getItemSize = (index: number) => rowSizes[index]
  return (
    <VariableSizeList
      height={200}
      itemCount={1000}
      itemSize={getItemSize}
    >
      {Row}
    </VariableSizeList>
  )
}

export { Variable }