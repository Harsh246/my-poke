import React from 'react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar(props) {

//const [sea, setSeac] = useState("");


  return (
      <div id="nav">
      <img src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg' />
      
      <input type="text" value={props.search} placeholder='search pokemon pika-pika' onChange={(e) => { props.setSearch(e.target.value); }}/>
          </div>
  )
}
