import React from 'react'
import './nav.css'

export default function nav() {
  return (
    <div className="nav-Container">
        <nav>
            <span>Coffee Coafe</span>
            <a href="#casher">Cashier</a>
            <a href="#casher">Sales Report</a>
            <button className="addNewItems">+ Add New Items</button>
        </nav>
    </div>
  )
}
