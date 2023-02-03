const express = require('express');
const routerDogs = express.Router()

const { getDogsHandler, createDogHandler, getDogHandler, deteleDogHandler }=require("../handlers/dogsHandler")

routerDogs.get("/", getDogsHandler);

routerDogs.get("/:id", getDogHandler);

routerDogs.post("/", createDogHandler);

// routerDogs.delete("/:id", deteleDogHandler)

 module.exports = routerDogs