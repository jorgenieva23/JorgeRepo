const {getAllTemp} = require("../controllers/TemperamentsControllers")
// const {Dog, Temperament} = require("../db")
// require('dotenv').config()

const getTempHandler = async (req, res)=>{
    const {name} = req.body
        try {
            const results = await getAllTemp(name)
            // console.log(results);
            res.status(200).send(results)
        } catch (error) {
            res.status(400).json({ error: error.message });
    }
}

module.exports={ getTempHandler }