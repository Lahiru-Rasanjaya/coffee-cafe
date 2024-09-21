import React from 'react'
import './nav.css'

export default function nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Coafe</span>
            <a href="/AdminLogin">+ Add New Items</a>
            <a href="#casher">SALES REPORT</a>
            <button className="addNewItems">CASHIER</button>
        </nav>
    </div>
  )
}
