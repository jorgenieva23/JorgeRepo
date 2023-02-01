const {Dog, Temperament}=require("../db")
const axios = require("axios")
// require('dotenv').config()
// const { API_KEY } = process.env;

const cleanArray = (arr) =>
arr.map((e)=>{
    return{
        id:e.id,
        name:e.name,
        life_span: e.life_span,
        height_max: parseInt(e.height.metric.slice(4).trim()),
        height_min: parseInt(e.height.metric.slice(0, 2).trim()),
        weight_max: parseInt(e.weight.metric.slice(4).trim()),
        weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
        temperament:  e.temperament ? e.temperament : 'Not Temperament',
        image: e.image.url,
        create:false,
    }
})

const cleanArray2 = (arr)=>
arr.map((e)=>{
    return{
        id:e.id,
        name:e.name,
        life_span: e.life_span,
        height_max: e.height_max,
        height_min: e.height_min,
        weight_max: e.weight_max,
        weight_min: e.weight_min,
        temperament: e.dataValues.temperaments.map(el => el.name).join(', '),
        image: e.image,
        createdInDB: true
    }
}) 


// const getDogById = async (id, source) => {
//     const dog = source === "api"
//         ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
//         : await Dog.findByPk(id, {
//             include: {
//                 model: Temperament,
//                 attributes: ['name'],
//                 through: {
//                     attributes: []
//                 }
//             }
//           });
  
//     return dog;
//   };



const createDog = async (name, image, temperament, 
    life_span, height_max, height_min, weight_max, weight_min)=>{
        return await Dog.create({name, temperament, image,
            life_span, height_max, height_min, weight_max, weight_min})
}
 
    
const getAllDogs = async () => {
    const databaseDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    const apiDogsRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;

    const apiDogs = cleanArray(apiDogsRaw)

    const bddDogs = cleanArray2(databaseDogs)
    
    return [...bddDogs, ...apiDogs]
}


const searchDogByName = async (name) => {
    const databaseDogs = await Dog.findAll({
        where: { name: name },        
        include: [{
        model: Temperament,
        attributes: ['name'],
        through: {
            attributes: []
            }
        }] 
    });

    const bddDogs = cleanArray2(databaseDogs)
    const apiDogsRaw = (await axios.get("https://api.thedogapi.com/v1/breeds")).data;

    const apiUsers = cleanArray(apiDogsRaw);

    const filteredApi = apiUsers.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));

    return [...filteredApi, ...bddDogs];
};




module.exports={ createDog, getAllDogs, searchDogByName, 
    // getDogById
}

