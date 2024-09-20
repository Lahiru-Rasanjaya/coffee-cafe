import React from "react";
import "./addItems.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function addItems() {
  return (
    <div className="addItem-container">
      <table>
        <tr>
          <td>
            <div className="namePrice">
              <span className="name">Latte</span>
              <span className="price">
                Rs:<span>100.00</span>
              </span>
            </div>
          </td>
          <td>
            <div className="plusAndMinus">
              <button className="minus">-</button>
              <input type="text" className="ItemNumber" />
              <button className="plus">+</button>
            </div>
          </td>
          <td align="center">
            <div className="delete">
              <button><DeleteIcon /></button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    
  );
}
