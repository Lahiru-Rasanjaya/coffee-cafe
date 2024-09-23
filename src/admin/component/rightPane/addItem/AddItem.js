import React, { useState } from "react";
import "./AddItem.css";
import axios from 'axios';

export default function AddItem() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);


    const url = 'http://localhost/egaleeyesstore/itemAdd.php';
    const itemAdd = (e) => {
        e.preventDefault(); 
        let fData = new FormData();
        fData.append('name', name);
        fData.append('price', price);
        fData.append('image', image);
        
        axios.post(url, fData)
          .then(Response => {
            const result = Response.data;
    
            if (result.success) {
              alert('Item added successfully');
              window.location.href = `/AdminHome`;
  
            } else {
                // setErrorMessage('Invalid email/password');
               alert('Item Add Error');

            }
          })
          .catch(error => {
            alert('Error occurred: ' + error.message);
          });
      };

  return (
    <div className="addItem-containers">
        
        <span className="topic">ADD ITEMS</span>
        <table className="tables">
            <tr className="ItemNameAndInputBox">
                <td className="td1">
                     <span className="ItemNames">Coffee Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                </td>
                <td className="td2">
                     <input type="text" placeholder="Enter Coffee Name" className="ItemInputBox" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </td>
            </tr>
            <tr className="ItemNameAndInputBox">
                <td className="td1">            
                      <span className="ItemNames">Coffee Price &nbsp; RS.&nbsp;</span>
                </td>
                <td className="td2">
                      <input type="text" placeholder="Enter Coffee Price" className="ItemInputBox" name="price" value={price} onChange={(e) => setPrice(e.target.value)} /> 
                </td>
            </tr>
            <tr className="ItemNameAndInputBox">
                <td className="fileAndName">            
                       <span className="ItemNames">Coffee Image</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <input type="file" className="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
                </td>
            </tr>
        </table>
        <div className="addItems">
            <button onClick={itemAdd}>Add</button>
        </div>
    </div> 
  );
}
