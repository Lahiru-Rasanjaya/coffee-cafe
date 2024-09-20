import React from "react";
import "./rightPane.css";
import AddItems from "./addItems/addItems";
import Total from "./total/total";

export default function leftpane() {
  return (
    <div className="leftPane-container">
      <div className="AddItems">
        <AddItems />
        <AddItems />
        <AddItems />
        <AddItems />
      </div>
      <hr />
      <div className="total">
        <Total />
      </div>
    </div>
  );
}
