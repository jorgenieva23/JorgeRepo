import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../image/puchi.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.nav}>
      <div className={style.TitleAndSearchBar}>
        <div className={style.logoAndTitle}>
          <Link to="/home">
            <img
              id="logoHenry"
              src={Logo}
              alt="a happy dog icon"
              className={style.logo}
            />
            
          </Link>
          <div>
            <h1>Woof</h1>
            <h2>The dog's page</h2>
          </div>
        </div>
        <div>
          {/* <NavLink to="/home" style={{ textDecoration: "none" }}>
            <button className={style.homeButton}>Home</button>
          </NavLink> */}
        </div>
        <div>
          <NavLink to="/create" style={{ textDecoration: "none" }}>
            <button className={style.createButton}>Create dog</button>
          </NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
// {/* <div className={style.detail}>
//   <Link to="/detail">DETAIL</Link>
// </div>  */}
// {/* <div className={style.form}>
//     <Link to="/create">FORM</Link>
// </div> */}
