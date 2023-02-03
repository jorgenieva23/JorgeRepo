import React, { useState, useEffect } from "react";
import style from "../Form/Form.module.css";
import { useHistory } from "react-router-dom";
import { createDogs, getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


const validate = (form) => {
  let errors = {};
  if (!form.name) {
      errors.name = 'Your breed must have a name';
  }
  else if (form.name.length > 30) {
    errors.name = 'That´s way too long a name. Keep it simple!!';
  }
  
  else if (!form.weight_max) {
      errors.weight_max = 'Maximum weight is required!!';
  }
  else if (isNaN(parseInt(form.weight_max))) {
      errors.weight_max = 'Weight should be a number';
  }
  else if (form.weight_max > 250) {
    errors.weight_max = 'We are creating a dog, not an elephant!! Keep your weight under 200';
  }
  else if (form.weight_max <= 0) {
    errors.weight_max = 'Your breed must weight at least more than nothingness';
  }
  
  
  else if (!form.weight_min) {
    errors.weight_min = 'Minimum weight is required!!';
  }
  else if (isNaN(parseInt(form.weight_min))) {
    errors.weight_min = 'Weight should be a number';
  }
  else if (form.weight_min <= 0) {
    errors.weight_min = 'Your breed must weight at least more than nothingness';
  }
  else if (parseInt(form.weight_max) <= parseInt(form.weight_min)) {
      errors.weight_min = 'Maximum weight should be higher than minimum weight';
  }
  
  else if (!form.height_max) {
      errors.height_max = 'Maximum height is required!!';
  }
  else if (isNaN(parseInt(form.height_max))) {
      errors.height_max = 'Height should be a number';
  }
  else if (form.height_max > 250) {
      errors.height_max = 'I think 150cm is enough for a dog´s height, don´t you?';
  }
  else if (form.height_max < 0) {
    errors.height_max = 'what..? that´s impossible';
  }


  else if (!form.height_min) {
    errors.height_min = 'Minimum height is required!!';
  }
  else if (isNaN(parseInt(form.height_min))) {
      errors.height_min = 'Height should be a number';
  }
  else if (form.height_min <= 0) {
      errors.height_min = 'Your breed can´t be shorter than 0';
  }
  else if (parseInt(form.height_min) >= parseInt(form.height_max)) {
      errors.height_min = 'Minimum height should be lower than maximum height';
  }


  else if (!form.life_span) {
      errors.life_span = 'Life span is required!!';
  }
  else if (isNaN(parseInt(form.life_span))) {
      errors.life_span = 'Life span should be a number';
  }
  else if (form.life_span > 50) {
      errors.life_span = 'Saddly, dogs don´t live that long';
  }
  else if (form.life_span <= 0) {
      errors.life_span = 'You don´t want your dog to live????';
  }

  return errors;
}
export default function Form() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  
  const [form, setForm] = useState({
    name: "",
    weight_max: "",
    weight_min: "",
    height_max: "",
    height_min: "",
    life_span: "",
    image: "",
    temperament: [],
  });
  
  console.log(form.temperament);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!form.temperament.includes(e.target.value)) {
      setForm({
        ...form,
        temperament: [...form.temperament, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    setForm({
      ...form,
      temperament: form.temperament.filter((temp) => temp !== e),
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(form.temperament);
    dispatch(createDogs(form));
    alert("creado exitosamente");
    setForm({
      name: "",
      weight_max: "",
      weight_min: "",
      height_max: "",
      height_min: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    history.push("/home");
  }
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  console.log(form);
  return (
    <div className={style.mainContainerCreation}>
      <h1>Crea tu perro</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <p>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={(e) => handleChange(e)}
              // required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </p>
        </div>
        <div>
          <label>Weight Max: </label>
          <p>
            <input
              type="number"
              value={form.weight_max}
              name="weight_max"
              onChange={(e) => handleChange(e)}
              // required
            />
            {errors.weight_max && <p className="error">{errors.weight_max}</p>}
          </p>
        </div>
        <div>
          <label>Weight Min: </label>
          <p>
            <input
              type="number"
              value={form.weight_min}
              name="weight_min"
              onChange={(e) => handleChange(e)}
              // required
            />
            {errors.weight_min && <p className="error">{errors.weight_min}</p>}
          </p>
        </div>
        <div>
          <label>Height Max: </label>
          <p>
            <input
              type="number"
              value={form.height_max}
              name="height_max"
              onChange={(e) => handleChange(e)}
              // required
            />
            {errors.height_max && <p className="error">{errors.height_max}</p>}
          </p>
        </div>
        <div>
          <label>Height Min: </label>
          <p>
            <input
              type="number"
              value={form.height_min}
              name="height_min"
              onChange={(e) => handleChange(e)}
              // required
            />
            {errors.height_min && <p className="error">{errors.height_min}</p>}
          </p>
        </div>
        <div>
          <label>Life span: </label>
          <p>
            <input
              type="number"
              value={form.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
              // required
            />
            {errors.life_span && <p className="error">{errors.life_span}</p>}
          </p>
          <div>
            <label>Photo: </label>
            <p>
              <input
                type="text"
                value={form.image}
                name="image"
                onChange={(e) => handleChange(e)}
                // required
              />
              <input
              type="file"
              value={form.image}
              name="image"
              onChange={(e) => handleChange(e)}
              // required

              />
            </p>
          </div> 
          <select onChange={(e) => handleSelect(e)}>
            <option value="selected" hidden>
              Temperaments
            </option>
            {allTemperaments
              ?.sort(function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
              })
              .map((e) => {
                return <option value={e}>{e}</option>;
              })}
          </select>
        </div>
        {form.temperament.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handleDelete(el)}>x</button>
          </div>
        ))}
        <div>
          <p>
            <button className={style.bCreate} type="submit">
              <h6>Crear Perro</h6>
              </button>
          </p>
        </div>
      </form>
    </div>
  );
}
