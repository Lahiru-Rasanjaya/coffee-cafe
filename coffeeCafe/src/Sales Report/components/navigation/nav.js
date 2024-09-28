import React from 'react'
import './nav.css'

export default function nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Cafe</span>
            <button className="addNewItems sales">SALES REPORT</button>
            <a href="/Home"> CASHIER</a>
            <a href="/AdminLogin">+ Add New Items</a>
        </nav>
    </div>
  )
}
