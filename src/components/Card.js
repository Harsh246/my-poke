import React from 'react';
import './Card.css';

export default function Card({item, setModal}) {
  
  return (
      <div id="card" key={item.id}>
          <div id="image">
<img src={item.image} alt='poke'/>
          </div>
      <div id="name" title="Details" onClick={() => { console.log("clicked"); setModal({show:true, id:item.id})}}>
{item.name}
          </div>
    </div>
  )
}
