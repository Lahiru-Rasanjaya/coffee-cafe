import './Delete.css';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function Delete() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isChecked, setIsChecked] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemName = queryParams.get('name');
    const itemPrice = queryParams.get('price');
    const itemImage = queryParams.get('image'); 

    if (itemName) setName(decodeURIComponent(itemName));
    if (itemPrice) setPrice(itemPrice);
    
    if (itemImage) {
      const decodedImage = decodeURIComponent(itemImage);
      if (decodedImage.startsWith('data:image/')) {
        setImage(decodedImage);
      } else {
        console.error('Image format not recognized');
      }
    }
  }, [location.search]);

  const handleDeleteConfirm = () => {
    if (!isChecked) {
      alert('Please confirm the deletion by checking the box.');
      return;
    }

    const itemId = new URLSearchParams(location.search).get('id');
    axios.post('http://localhost:5000/admin/deleteItem', { id: itemId })
      .then(response => {
        if (response.data.success) {
          alert('Item deleted successfully');
          window.location.href = '/AdminHome'; 
        } else {
          alert('Error deleting item: ' + response.data.error || 'Unknown error');
        }
      })
      .catch(error => {
        alert('Error occurred: ' + error.message);
      });
  };
  return (
    <div className="DeleteImage">
      <div className="mainUpdate">
        <div className="closedelete">
          <a href='./AdminHome' className="closebutton">x</a>
        </div>
        <div className="Update-containers">
          <div className='DeleteItemDetails'>
            <div className="deleteItemImage">
                {image ? ( <img src={image} alt={name} /> ) : (<p>No Image Available</p> )}
            </div>
            <div className="Delete-item-Details">
            <span className="topics">DELETE ITEM</span>
            <hr />
            <div className="namePrice">
               <h3>{name}</h3>
               <p>Price: Rs. {price}</p>
            </div>
            <hr />
            <div className='conform'>
              <input type="checkbox" id="deleteConfirm" className='checkmark' checked={isChecked} onChange={() => setIsChecked(!isChecked)} 
              />
              <label htmlFor="deleteConfirm">I confirm to delete this item</label>
            </div>

            <button onClick={handleDeleteConfirm} className='deleteButton' disabled={!isChecked}>
              Confirm Delete
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
