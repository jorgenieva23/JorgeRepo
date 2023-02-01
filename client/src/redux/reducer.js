import {
  GET_ALL_DOGS,
  GET_DOG_NAME,
  GET_ALL_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_NAME,
  FILTER_BY_WEIGHT,
  GET_DOG_DETAIL,
  CREATE_DOG
} from "./actions"

const initialState = {
    dogs:[],
    temperaments:[],
    allDogs: [],
    details:[],
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_DOGS:
        return { 
          ...state, 
          dogs:action.payload,
          allDogs: action.payload,
        };
      case GET_DOG_NAME:
        return {
          ...state,
          dogs:action.payload
        }
      case GET_ALL_TEMPERAMENT:
        return {
          ...state,
          temperaments: action.payload
        }
      case FILTER_BY_TEMPERAMENT:
          // const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
          //     const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(el => {
          //       console.log(action.payload);
          //         if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
          //         if (Array.isArray(el.temperaments)) {
          //           console.log(temperamentFiltered('hola'));
          //             let temps = el.temperaments.map(el => el.name);
          //             return temps.includes(action.payload);
          //         }
          //         return true;
          //     });
          //     return {
          //         ...state,
          //         dogs: temperamentFiltered
          //     }


        const dogss = state.allDogs;
        const temperamentsFiltered =
        action.payload === "temp"
          ? dogss
          : dogss.filter((el) =>el.temperament.toLowerCase().includes(action.payload.toLowerCase())
            );
            console.log(temperamentsFiltered);
      return {
        ...state,
        dogs: temperamentsFiltered,
      }

      case FILTER_BY_ORIGIN:
          const allDogs2 = state.allDogs;
          const filterCreated = action.payload === 'created' ? allDogs2.filter(d => d.createdInDB) : allDogs2.filter(d => !d.createdInDB)
          return {
            ...state,
            dogs: action.payload === 'all' ? state.allDogs : filterCreated
          };

      case ORDER_BY_NAME:
        let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
      case FILTER_BY_WEIGHT:
        const filterWeiht = action.payload === 'asc' ?
          state.dogs.sort(function (a, b) {
              return parseInt(a.weight_max) - parseInt(b.weight_max);
          }) :
          state.dogs.sort(function (a, b) {
              return parseInt(b.weight_min) - parseInt(a.weight_min);
          });
        return {
          ...state,
          dogs: filterWeiht,
        }

      case GET_DOG_DETAIL:
                return {
          ...state,
          details: action.payload
        }

      case CREATE_DOG:
        return {
          ...state,
        }  
      default:
        return {...state}
        
    }
  };
  
  export default rootReducer;
