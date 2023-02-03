// const axios = require("axios")
const {Dog, Temperament} = require("../db")
const { createDog, getAllDogs, getDogById, searchDogByName} = require("../controllers/DogsControllers");
// const Temperament = require("../models/Temperament");


const getDogsHandler = async (req, res)=>{
    const { name } = req.query

    const results = name ? await searchDogByName(name) : await getAllDogs();

    res.status(200).json(results);
};


const getDogHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const allDogs = await getAllDogs();
        if (!id) {
            res.status(404).json("Couldn't find the name on DBase")
        } else {
            const dog = allDogs.find(dogui => dogui.id.toString() === id);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}


const createDogHandler = async (req, res)=> {
    let { name, image, temperament,  life_span, height_max, 
        height_min,  weight_max,  weight_min, createdInDB } = req.body  
        console.log(temperament);    
        try {
            let newDog = await createDog (
                name, image, temperament,  life_span, height_max, 
                 height_min,  weight_max,  weight_min, createdInDB )

                const temp = await Temperament.findAll({
                    where:{name:temperament}
            })
            newDog.addTemperament(temp)
            res.status(201).json("Creado exitosamente")       
        }
            catch (error) {         
            res.status(400).json({ error: error.message });
        }
    }




module.exports={getDogsHandler, createDogHandler, getDogHandler}
