import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card.js';
import laoding from './images/laoding.gif';
import Modal from './components/Modal.js';

function App() {
 
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState({ show: false, id: 0 });

  const [loading, setLoading] = useState(true);

  const setPokemon = (pok) => {
    
    let url = pok.url;

    

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        let tempList=[];
        if (!list.includes({name:data.name,id:data.id,img:data.img}))
          
       {
         tempList = list;
        tempList.push({
          name: data.name,
          id: data.id,
          image: data.sprites.other.dream_world["front_default"]
        });


        setList(tempList);}
      });

  }

  useEffect(() => {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

      
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((item) => {
          setPokemon(item);
        });
        return list;
      })
      .then((l) => {console.log(l)});
    
    setTimeout(() => {
       setLoading(false);
    }, 3000);
   

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div id="container">
       
        {loading ? <img id="loading" src={laoding} alt="loading" /> : search ? <>
          
          {list.map((item, key) => {
          
            if (item.name.includes(search.toLowerCase())){
              return <Card item={item} key={key} setModal={setModal} />
            }
            else {
              return <></>;
            }
          })
          
          }
          
        </> : <>
        {list.map((item, key) =><Card item={item} key={key} setModal={setModal}/>)}
            </> 
    } 

   

     
      </div>
      {modal.show ? <Modal id={modal.id} setModal={setModal} /> : null}
  
 
</>

  );
}

export default App;
