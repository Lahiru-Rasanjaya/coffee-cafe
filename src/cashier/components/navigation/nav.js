import React from 'react'
import './nav.css'

export default function nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Cafe</span>
            <button className="addNewItems sales">CASHIER</button>
            <a href="/AdminLogin">+ Add New Items</a>
            <a href="/sales">SALES REPORT</a>
        </nav>
    </div>
  )
}
