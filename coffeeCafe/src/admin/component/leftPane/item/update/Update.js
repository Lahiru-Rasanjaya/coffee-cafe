import './Update.css';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function Update() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');

  const location = useLocation();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemName = queryParams.get('name');
    const itemPrice = queryParams.get('price');
    const itemId = queryParams.get('id'); // Get the item ID from the query parameters

    if (itemName) setName(itemName);
    if (itemPrice) setPrice(itemPrice);
    if (itemId) setId(itemId); // Set the ID
  }, [location.search]);

  const itemAdd = (e) => {
    e.preventDefault(); 
    let fData = new FormData();
    fData.append('id', id);
    fData.append('price', price);

    axios.post('http://localhost/egaleeyesstore/update.php', fData)
      .then((response) => {
        const result = response.data;
        if (result.success) {
          alert('Item Updated successfully');
          window.location.href = `/AdminHome`;
        } else {
          alert('Update Error');
        }
      })
      .catch(error => {
        alert('Error occurred: ' + error.message);
      });
  };

  return (
    <div className="backImage">
      <div className="mainUpdate">
        <div className="close">
          <a href='./AdminHome' className="closebutton">x</a>
        </div>
        <div className="Update-containers">
          <span className="topics">UPDATE ITEMS</span>
          <table className="tables">
            <tr className="ItemNameAndInputBox">
              <td className="td1">
                <span className="ItemNames">Coffee Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
              </td>
              <td className="td2">
                <input type="text" placeholder="Enter Coffee Name" className="ItemInputBox" value={id} onChange={(e) => setId(e.target.value)} hidden />
                <input type="text" placeholder="Enter Coffee Name" className="ItemInputBox" value={name} onChange={(e) => setName(e.target.value)} readOnly />
              </td>
            </tr>
            <tr className="ItemNameAndInputBox">
              <td className="td1">            
                <span className="ItemNames">Coffee Price &nbsp; RS.&nbsp;</span>
              </td>
              <td className="td2">
                <input type="text" placeholder="Enter Coffee Price" className="ItemInputBox" value={price} onChange={(e) => setPrice(e.target.value)} /> 
              </td>
            </tr>
          </table>
          <div className="addItems">
            <button onClick={itemAdd}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
