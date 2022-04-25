import React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card.js";
import laoding from "./images/laoding.gif";
import Modal from "./components/Modal.js";
import { v4 as uuidv4 } from "uuid";

import { useRef } from "react";

// const useStyles = makeStyles((theme) => ({
//   color: {
//     color: "white"
//   }
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-selected": {
      backgroundColor: "transparent",
      color: "#19D5C6",
    },

    "& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
      color: "white",
    },
  },
}));

function App() {
  const container = useRef();
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

      setList(
        list.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )
      );
      let count = Math.ceil(list.length / 15);

      console.log(count);

      setTotalPages(count);

      const indexOfLastPoke = currentPage * 15;
      const indexOfFirstPoke = indexOfLastPoke - 15;

      const currentpokes = list.slice(indexOfFirstPoke, indexOfLastPoke);

      setCurrentPokeList(JSON.parse(JSON.stringify(currentpokes)));
      console.log(currentPokeList.length);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    getList();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (e, value) => {
    console.log(value);
    window.scrollTo(0, 0);
    setCurrentPage(value);
    console.log(currentPage); // hence proved, useState is async :)
    const indexOfLastPoke = value * 15;
    const indexOfFirstPoke = indexOfLastPoke - 15;
    console.log(indexOfFirstPoke, indexOfLastPoke);

    const currentpokes = list.slice(indexOfFirstPoke, indexOfLastPoke);

    setCurrentPokeList(JSON.parse(JSON.stringify(currentpokes)));
    console.log(currentPokeList.length);
    container.current.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div id="container" ref={container}>
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
              <Card
                data-aos={"fade-up"}
                item={item}
                key={uuidv4()}
                setModal={setModal}
              />
            ))}

            <div id="footer">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                siblingCount={1}
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
