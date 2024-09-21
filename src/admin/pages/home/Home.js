import React from 'react'
import RightPane from '../../component/rightPane/RightPane'
import LeftPane from '../../component/leftPane/leftPane'
import Nav from '../../component/navigation/Nav'

export default function Home() {
  return (
    <div className='container'>
        <Nav />
        <div className="home-container">    
            <LeftPane />
            <RightPane />
        </div>
    </div>
  )
}
