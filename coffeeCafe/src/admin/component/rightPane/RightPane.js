import React from "react";
import "./RightPane.css";
import AddItem from "./addItem/AddItem";

export default function leftpane() {
  return (
    <div className="leftPane-containers">
      <div className="backgrounds">
        <div className="AddItems">
          <AddItem />
        </div>
      </div>
    </div>
  );
}
