import React from 'react'

export default function Nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Cafe</span>
            <button className="addNewItems sales">+ADD NEW ITEM</button>
            <a href="/Home" id='cashire' >CASHIER</a>
            <a href="/sales">SALES REPORT</a>
        </nav>
    </div>
  )
}
