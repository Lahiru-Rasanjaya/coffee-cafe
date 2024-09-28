import React from "react";
import "./rightPane.css";
import AddItems from "./addItems/addItems";

export default function leftpane() {
  return (
    <div className="leftPane-container">
      <div className="background">
      <div className="AddItems">
        <AddItems />
      </div>
      </div>
    </div>
  );
}
