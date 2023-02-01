const { Router } = require("express");
require('dotenv').config()

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routerDogs = require("./routerDogs");
const routerTemps = require("./routerTemperament")

const router = Router();
// router.use(express.json())

// Configurar los routers
router.use("/dogs", routerDogs);
router.use("/temperaments", routerTemps)


module.exports = router;
