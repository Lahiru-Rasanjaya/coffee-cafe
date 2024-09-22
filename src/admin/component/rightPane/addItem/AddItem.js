import React from "react";
import "./AddItem.css";

export default function AddItem() {
  return (
    <div className="addItem-containers">
        <span className="topic">ADD ITEMS</span>
        <table className="tables">
            <tr className="ItemNameAndInputBox">
                <td className="td1">
                     <span className="ItemNames">Coffee Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                </td>
                <td className="td2">
                     <input type="text" placeholder="Enter Coffee Name" className="ItemInputBox" />
                </td>
            </tr>
            <tr className="ItemNameAndInputBox">
                <td className="td1">            
                      <span className="ItemNames">Coffee Price &nbsp; RS.&nbsp;</span>
                </td>
                <td className="td2">
                      <input type="text" placeholder="Enter Coffee Price" className="ItemInputBox" /> 
                </td>
            </tr>
            <tr className="ItemNameAndInputBox">
                <td className="fileAndName">            
                       <span className="ItemNames">Coffee Image</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <input type="file" className="file" />
                </td>
            </tr>
        </table>
        <div className="addItems">
            <button>Add</button>
        </div>
    </div> 
  );
}
