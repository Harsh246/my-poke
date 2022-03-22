import React from "react";
import { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal({ id, setModal }) {
  const [stats, setStats] = useState({
    name: "",
    img: "https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  var i, h, a, d, s, nam, t;
  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        nam = data.name;
        i = data.sprites.other.dream_world["front_default"];
        h = data.stats[0].base_stat;
        a = data.stats[1].base_stat;
        d = data.stats[2].base_stat;
        s = data.stats[5].base_stat;
        t = data.types[0].type.name;

        return stats;
      })
      .then(() => {
        setStats({
          img: i,
          hp: h,
          attack: a,
          defense: d,
          speed: s,

          name: nam,
          type: t,
        });
      });
  }, []);

  return (
    // click anywhere outside main modal dailog to close modal. this id as modal is used to set background color.
    <div
      id="modal"
      onClick={(e) => {
        e.stopPropagation();
        setModal({ show: false, id: 0 });
      }}
    >
      <div
        id="card"
        onClick={(e) => {
          e.stopPropagation(); //had to stop event capturing
        }}
      >
        <div id="img">
          <div
            id="close"
            title="close"
            onClick={() => {
              setModal({ show: false, id: 0 });
            }}
          >
            ✖
          </div>
          <div id="hp">
            <span>hp: {stats.hp} </span>
          </div>
          <img src={stats.img} />
        </div>

        <div id="name"> {stats.name} </div>
        <div id="info">
          <div class="row">
            <div>Attack:</div>
                      <div>{ stats.attack}</div>
          </div>
<div class="row">
            <div>Speed:</div>
            <div>{stats.speed}</div>
          </div>
          <div class="row">
            <div>Defense:</div>
            <div>{stats.defense}</div>
          </div>

          <div class="row">
            <div>Type:</div>
            <div>{stats.type.toUpperCase()}</div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
