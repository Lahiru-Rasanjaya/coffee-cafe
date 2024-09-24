import React from 'react'
import './nav.css'

export default function nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Coafe</span>
            <button className="addNewItems">CASHIER</button>
            <a href="/AdminLogin">+ Add New Items</a>
            <a href="#casher" className='sales'>SALES REPORT</a>
        </nav>
    </div>
  )
}
