 const {Dog, Temperament} = require("../db")
 const axios = require("axios")

const cleanArray = (arr) => 
    arr.map((e)=>{
        return{
            temperament: e.temperament,
            // create:false
        }
    })


const getAllTemp = async () => {
    const BddTemp = await Temperament.findAll(
        {
            include: {
                model: Dog,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        }
);
// console.log("hola");
//     if(!BddTemp.length){
        const apiData = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
        const apiTemps = await cleanArray(apiData)
        
        let aux = apiTemps.map((e) => Object.values(e)).filter((e) => e !== "").flat().join(', ').split(', ').filter((e) => e !== "").slice(1);
        let aux2 = new Set(aux)
    
        let apiTemp = [...aux2]
    
        apiTemp.map(el=> Temperament.findOrCreate({
            where: {name: el}
      }))  

    //   console.log(aux2) 
      return apiTemp                    
}


module.exports= {getAllTemp}