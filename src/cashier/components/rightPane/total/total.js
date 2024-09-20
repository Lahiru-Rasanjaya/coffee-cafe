import React from 'react'
import './total.css'

export default function total() {
  return (
    <div className="itemTotal">
         <div className="addItem-container">
        <table>
        <tr>
          <td>
            <div className="namePrice">
              <span className="name">Total</span>
            </div>
          </td>
          <td className="DisplayTotal">
            <div>
              <input type="text" className="displyTotal" />
            </div>
          </td>
        </tr>
      </table>
    </div>
    <button className="oder">Place Order</button>
    </div>
   
  )
}
