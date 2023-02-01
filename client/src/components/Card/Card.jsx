import style from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = (props)=>{
return (
    <div className={style.div}>
      <div>
        <Link to={`/detail/${props.id}`} 
        style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div>
          <img className={style.image}
            src={props.image}
            alt="Imagen del perro."
            />
          </div>
            <h2 className={style.name}>{props.name}</h2>       
        </Link>
        <h4 className={style.peso}>
          Peso max: {props.weight_max} Peso min: {props.weight_min} </h4>
        <div>
          <h4 className={style.divTemperamento}> {props.temperament}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card 