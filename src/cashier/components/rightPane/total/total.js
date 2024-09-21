import React from 'react'
import './total.css'

export default function total() {
  return (
    <div className="itemTotal">
         <div className="addItem-container">
        <table>
        <tr className='tableAlign'>
          <td>
            <div className="namePrice">
              <span className="name">Total</span>
            </div>
          </td>
          <td className="DisplayTotal">
              <span>RS.&nbsp;</span> <input type="text" className="displyTotals" />
          </td>
        </tr>
      </table>
    </div>
    <button className="oder">Place Order</button>
    </div>
   
  )
}
