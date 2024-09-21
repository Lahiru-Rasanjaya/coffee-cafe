import React, { useState, useEffect } from "react";
import axios from "axios"; 
import './Item.css'

export default function Item() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/egaleeyesstore/getItems.php")
      .then((response) => {
        console.log(response.data); 
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  },);

  return (
    <div className="main">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="item-container" key={item.id} >
          <img src={item.itemImage} alt="latte-image" />
          <div className="item"> 
            <div className="item-content">
              <div className="namAndPrice">
                <span className="name">{item.itemName}</span>
                <span className="price">
                  Rs:<span className="priceLeft">{item.itemPrice}</span>
                </span>
              </div>
              <div className="Addbuttons">
                <button className="addbutton">Edit</button>
                <button className="DeleteButton">Delete</button>
              </div>
            </div>
          </div>
          </div>
        ))
      ) : (
        <p className="NoData">No Items Available</p>
      )}
    </div>
  );
}
