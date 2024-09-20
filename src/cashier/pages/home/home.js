import React from 'react';
import './home.css';
import Nav from '../../components/navigation/nav';
import RightPane from '../../components/rightPane/rightPane';
import Leftpane from '../../components/leftPane/leftPane';

export default function home() {
  return (
    <div className='container'>
        <Nav />
        <div className="home-container">    
            <Leftpane />
            <RightPane />
        </div>
    </div>
  )
}
