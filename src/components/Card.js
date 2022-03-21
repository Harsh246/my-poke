import React from 'react';
import './Card.css';

export default function Card({item}) {
  
  return (
      <div id="card" key={item.id}>
          <div id="image">
<img src={item.image} alt='poke'/>
          </div>
          <div id="name" title="Details">
{item.name}
          </div>
    </div>
  )
}
