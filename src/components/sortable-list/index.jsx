import React from "react";
import SortableList from "./SortableList";
import "./index.css";

const data = Array.from({ length: 100 }, (_, i) => i + 1);

const SortableListMain = () => {
  return (
    <div className="sortable-list-main">
      <SortableList data={data} />
    </div>
  );
};

export default SortableListMain;
