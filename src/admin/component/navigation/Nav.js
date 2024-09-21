import React from 'react'

export default function Nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Coafe</span>
            <a href="/Home" id='cashire' >CASHIER</a>
            <a href="#casher">SALES REPORT</a>
            <button className="addNewItems">+ADD NEW ITEM</button>
        </nav>
    </div>
  )
}
