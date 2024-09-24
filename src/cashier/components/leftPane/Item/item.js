import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./item.css";
import eventBus from "./eventBus";

export default function Item() {
  const [items, setItems] = useState([]);
  const [addedItemId, setAddedItemId] = useState(null); // State to track the added item ID

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
  }, []);

  const handleAddItem = (itemId, itemName, itemPrice, event) => {
    event.preventDefault(); 
    eventBus.emit('dataChanged', { name: itemName, price: itemPrice }); 
    setAddedItemId(itemId); // Set the added item ID
  };

  return (
    <div className="main">
      {items.length > 0 ? (
        items.map((item) => (
          <div className={`item-container ${addedItemId === item.id ? 'added' : ''}`} key={item.id} >
            <img src={item.itemImage} alt="latte-image" />
            <div className="item"> 
              <div className="item-content">
                <div className="namAndPrice">
                  <span className="name">{item.itemName}</span>
                  <span className="price">
                    Rs:<span className="priceLeft">{item.itemPrice}</span>
                  </span>
                </div>
                <div className="Addbutton">
                  <button className="add" onClick={(e) => handleAddItem(item.id, item.itemName, item.itemPrice, e)}>Add</button>
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
