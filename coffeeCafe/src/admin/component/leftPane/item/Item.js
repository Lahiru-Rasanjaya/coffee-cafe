import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Item.css';

export default function Item() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get("http://localhost:5000/cashier/items")
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

  const handleEdit = (item) => {
    const { itemName, itemPrice, id, itemImage } = item;
    navigate(`/Update?name=${itemName}&price=${itemPrice}&id=${id}&image=${itemImage}`);
  };
  const handleDelete = (item) => {
    const { itemName, itemPrice, id, itemImage } = item;
    navigate(`/Delete?name=${encodeURIComponent(itemName)}&price=${itemPrice}&id=${id}&image=${encodeURIComponent(itemImage)}`);
};


  return (
    <div className="main">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="item-container" key={item.id}>
            <img src={item.itemImage} alt="latte-image" />
            <div className="item"> 
              <div className="item-content">
                <div className="namAndPrice">
                  <span className="name">{item.itemName}</span>
                  <span className="price">
                    Rs. <span className="priceLeft">{item.itemPrice}</span>
                  </span>
                </div>
                <div className="Addbuttons">
                  <button className="addbutton" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="DeleteButton" onClick={() => handleDelete(item)}>Delete</button>
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
