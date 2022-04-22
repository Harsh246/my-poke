import React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { makeStyles, createStyles } from '@material-ui/core/styles';

import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card.js";
import laoding from "./images/laoding.gif";
import Modal from "./components/Modal.js";
import { v4 as uuidv4 } from 'uuid';

// const useStyles = makeStyles((theme) => ({
//   color: {
//     color: "white"
//   }
// }));

const useStyles = makeStyles((theme) =>({
  root: {

      '& .Mui-selected': {
        backgroundColor: 'transparent',
        color:'#19D5C6',
       },

       '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root':{
         color:"white"
       }
       
  } })
);

function App() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState({ show: false, id: 0 });

  const [loading, setLoading] = useState(true);

  const [currentPokeList, setCurrentPokeList] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    var result;
    setList([]);
    setTotalPages(10);
    setCurrentPage(1);
    setCurrentPokeList([]);

    

    const getList = async () => {
      result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(
        (response) => response.json()
      );
 
      for (const item of result.results) {
        let data = await fetch(item.url).then((res) => res.json());
        let tempList = [];
        if (!list.includes({ name: data.name, id: data.id, img: data.img })) {
          tempList = list;
          tempList.push({
            name: data.name,
            id: data.id,
            image: data.sprites.other.dream_world["front_default"],
          });

          setList(tempList);
         // console.log(list.length);

 }


 
}

setList(list.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
              let count = Math.ceil(list.length / 15);

              console.log(count);
      
              setTotalPages(count);

              const indexOfLastTodo = currentPage * 15;
              const indexOfFirstTodo = indexOfLastTodo - 15;

              const currentpokes = list.slice(indexOfFirstTodo, indexOfLastTodo);

              

              setCurrentPokeList(JSON.parse(JSON.stringify(currentpokes)));
              console.log(currentPokeList.length);
    






         
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    getList();


 
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (e, value) => {
    console.log(value);
    setCurrentPage(value);
    console.log(currentPage); // hence proved, useState is async :)
    const indexOfLastTodo = value * 15;
    const indexOfFirstTodo = indexOfLastTodo - 15;
    console.log(indexOfFirstTodo, indexOfLastTodo);

    const currentpokes = list.slice(indexOfFirstTodo, indexOfLastTodo);

    
    setCurrentPokeList(JSON.parse(JSON.stringify(currentpokes)));
    console.log(currentPokeList.length);
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div id="container">
        {loading ? (
          <img id="loading" src={laoding} alt="loading" />
        ) : search ? (
          <>
            {list.map((item, key) => {
              if (item.name.includes(search.toLowerCase())) {
                return <Card item={item} key={key} setModal={setModal} />;
              } else {
                return <></>;
              }
            })}
            
          </>
        ) : (
          <>
            {currentPokeList.map((item, key) => (
              <Card item={item} key={uuidv4()} setModal={setModal} />
            ))}

<div id="footer">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                siblingCount={0}
                className={classes.root} 
              />{" "}
            </div>
          
          </>
        )}

      </div>

      {modal.show ? <Modal id={modal.id} setModal={setModal} /> : null}
    </>
  );
}

export default App;
