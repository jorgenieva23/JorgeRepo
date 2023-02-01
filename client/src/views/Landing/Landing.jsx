import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landing}>
        <div className={style.imge}>
        <h1 className={style.title}>Welcome to Dogs</h1>
        <NavLink to="/home" style={{ textDecoration: "none" }}>
          <button className={style.button}>Ingresar</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
