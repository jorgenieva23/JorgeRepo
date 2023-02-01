import React from "react";
import style from "../Home/Home.module.css";
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../../components/Paginado/Paginado";
import stylo from "./Home.module.css";
import {
  getDogs,
  filterByBddOrApi,
  filterByTemperament,
  getTemperaments,
  orderByName,
  filterByWeigth,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [, /*order*/ setOrder] = useState("");
  const [render, setRender] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handlerOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handlerWeight(e) {
    e.preventDefault();
    dispatch(filterByWeigth(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handlerClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getDogs());
  }

  function handlerClickOrigin(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByBddOrApi(e.target.value));
  }

  function handlerFilterTemperament(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByTemperament(e.target.value));
    setRender(render + 1);
  }

  return (
    <div className={stylo.sideBarHeader}>
      <div className={stylo.header}>
        <h4 className={stylo.h4}> Find by filters:</h4>
        <button
          onClick={(e) => {
            handlerClick(e);
          }}
        >
          Reload Page
        </button>
      </div>
      <div>
        <div>
          <div className={style.filterSection}>
            <h5 className={style.filterHeader}>Filter by temperament</h5>
            <select onChange={(e) => handlerFilterTemperament(e)}>
              <option key={0} value="temp">
                All temperaments
              </option>
              {allTemperaments
                ?.sort(function (a, b) {
                  if (a < b) return -1;
                  if (a > b) return 1;
                  return 0;
                })
                .map((e) => {
                  return (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={style.filterSection}>
            <h5 className={style.filterHeader}>Order by name</h5>
            <select
              onChange={(e) => {
                handlerOrder(e);
              }}
            >
              <option defaultValue value="all" hidden>
                Order
              </option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
          <div className={style.filterSection}>
            <h5 className={style.filterHeader}>Order by weight</h5>
            <select
              onChange={(e) => {
                handlerWeight(e);
              }}
            >
              <option defaultValue value="all" hidden>
                Order
              </option>
              <option value="asc">Heaviest 1º</option>
              <option value="desc">Lightest 1º</option>
            </select>
          </div>
          <div className={style.filterSection}>
            <h5 className={style.filterHeader}>Filter by source</h5>
            <select
              onChange={(e) => {
                handlerClickOrigin(e);
              }}
            >
              <option defaultValue value="all">
                All
              </option>
              <option value="created">Created </option>
              <option value="inDB">Existing </option>
            </select>
          </div>
        </div>
        <div>
          {currentDogs.map((c) => {
            return (
              <Card
                key={c.id}
                id={c.id}
                name={c.name}
                life_span={c.life_span}
                weight_max={c.weight_max}
                weight_min={c.weight_min}
                temperament={c.temperament}
                image={c.image}
              />
            );
          })}
        </div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
};

export default Home;

// {/* <div className={style.button}>
// <button
//   onClick={(e) => {handlerClick(e)}}>
//     Reload Page
// </button>
// </div> */}

//   const handlerFilterTemperament = (e) => {
//     e.preventDefault();
//     dispatch(filterByTemperament(e.target.value));
//     setCurrentPage(1);
//   }
