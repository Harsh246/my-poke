import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card.js';
import laoding from './images/laoding.gif';

function App() {
 
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

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
          image: data.sprites["front_default"]
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
   


  }, []);



  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div id="container">
       
        {loading ? <img id="loading" src={laoding} /> : search ? <>
          
          {list.map((item, key) => {
          
            if (item.name.includes(search.toLowerCase())){
              return <Card item={item} key={key} />}
          })}
        </> : <>
        {list.map((item, key) => <Card item={item} key={key} />)}
            </> 
    } 


      </div>
      
    </>


  );
}

export default App;
