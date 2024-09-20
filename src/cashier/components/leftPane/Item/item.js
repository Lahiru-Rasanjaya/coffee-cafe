import React from "react";
import "./item.css";

export default function item() {
  return (
    <div className="item-container">
      <img src="./images/latte.jpg" alt="latte-image" />
      <div className="item">
        <div className="item-content">
            <div className="namAndPrice">
            <span className="name">Latte</span>
          <span className="price">
            Rs:<span className="priceLeft">100.00</span>
          </span>
            </div>
          <div className="Addbutton">
            <button className="add">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
