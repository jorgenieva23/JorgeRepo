import React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getdog} from "../../redux/actions"
import style from "./Detail.module.css"
import { Link } from "react-router-dom";
import heart from "../../image/cora.png"
import scale from "../../image/alt.png"
import bone from "../../image/peso.png"




export default function Detail(props) {
    
    const dispatch=useDispatch()
    const doge = useSelector((state)=> state.details)
    

    useEffect(() => {
        dispatch(getdog(props.match.params.id));
        //  console.log(props.match.params.id, "Hola");
        // setDoge(doges)
    }, [dispatch, props.match.params.id]);
   



return (
  <div key={doge.id} className={style.bodix}>
  <div className={style.mainContainer}>
    <h2 className={style.mainTitle}>{doge.name}</h2>
    <img src={doge.image} alt={doge.name} className={style.image} />
    <div className={style.detailsContainer}>
      <div className={style.life_span}>
        <div className={style.imageSection}>
          <img
            src={heart}
            alt="a tiny svg dog"
            className={style.detailsSVG}
          />
        </div>
        <div className={style.infoSection}>
          <h3>Life span: </h3>
          <p>{doge.life_span}</p>
        </div>
      </div>
      <div className={style.weights}>
        <div className={style.imageSection}>
          <img
            src={scale}
            alt="a tiny svg dog"
            className={style.detailsSVG}
          />
        </div>
        <div className={style.infoSection}>
          <h3>Weight: </h3>
          <p>Min: {doge.weight_min}</p>
          <p>Max: {doge.weight_max}</p>
        </div>
      </div>
      <div className={style.heights}>
        <div className={style.imageSection}>
          <img
            src={bone}
            alt="a tiny svg bone"
            className={style.detailsSVG}
          />
        </div>
        <div className={style.infoSection}>
          <h3>Height: </h3>
          <p>Min: {doge.height_min}</p>
          <p>Max: {doge.height_max}</p>
        </div>
      </div>
      <br />
      <div className={style.temperament}>
        <div className={style.infoSection}>
          {
            <div>
              <h3>Temperament: </h3>
              <p>
                {doge.createdInDB
                  ? doge.temperament
                  : doge.temperament}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
    <Link to="/home">
      <button className={style.button}>Back</button>
    </Link>
  </div>
</div>
      )
    }