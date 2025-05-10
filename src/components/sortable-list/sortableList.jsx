import React, { useState } from "react";

const SortableList = ({ data }) => {
  const [list, setList] = useState(data);
  const [startIndex, setStartIndex] = useState(-1);

  if (data.length === 0) {
    return <div className="sortable-list">No items to display...</div>;
  }

  const reset = () => {
    setStartIndex(-1);
  };

  return (
    <div className="box">
      <div className="sortable-list-x">
        {list.map((d, i) => {
          let clsName = "row-x";

          if (i === startIndex) {
            clsName += "grabbing";
          }

          return (
            <div
              onDragStart={() => {
                setStartIndex(i);
              }}
              onDragEnd={() => {
                reset();
              }}
              className={clsName}
              key={i}
              draggable="true"
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortableList;
