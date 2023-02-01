import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_NAME = "GET_DOG_NAME"//por nombre
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const GET_ALL_TEMPERAMENT = "GET_ALL_TEMPERAMENT"//todos los temp
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"//filtrar perros por temp
export const ORDER_BY_NAME = "ORDER_BY_NAME"//filtrar por nombres
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT"//filtrar por peso
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";//por id o detalles del perro
export const FILTER_CREATE_DOG = "FILTER_CREATE_DOG" //filtrar por bdd o api
export const CREATE_DOG = "CREATE_DOG"//crear un perro

export const getDogs = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/dogs")
    const dogs = apiData.data;
    dispatch({ type: GET_ALL_DOGS, payload: dogs });
  };
};

export const getDogName=(name)=>{
  return async function (dipatch){
    try {
      const apiData = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      const IdDog = apiData.data
      dipatch({ type:GET_DOG_NAME, payload:IdDog })
    } catch (error) {
      console.log('The dog could not be found');
    }
  }
}

export const getdog = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios(`http://localhost:3001/dogs/${id}`)
      const dog = apiData.data;
      dispatch({type: GET_DOG_DETAIL, payload:dog})
        } catch (error) {
        
      console.log(error);
    }
  }
}

export function getTemperaments() {
    return async function (dispatch) {
    const apiData = await axios.get('http://localhost:3001/temperaments')
    const dog = apiData.data;
    dispatch({type: GET_ALL_TEMPERAMENT, payload: dog
    })
  }
}

export function filterByTemperament (payload){
  return {
    type: FILTER_BY_TEMPERAMENT, payload
  }
}

export function createDogs (data) {
  return async function (){
    const apiData = await axios.post("http://localhost:3001/dogs", data)
    return apiData
  }
}

export function filterByBddOrApi(payload){
  return {
    type: FILTER_BY_ORIGIN, payload
  }

}

export function orderByName(payload){
  return {
    type: ORDER_BY_NAME, payload
  }
}


export function filterByWeigth (payload){
  return {
    type: FILTER_BY_WEIGHT, payload
  }
}

