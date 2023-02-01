const express = require('express');
const routerDogs = express.Router()

const { getDogsHandler, createDogHandler, getDogHandler }=require("../handlers/dogsHandler")

routerDogs.get("/", getDogsHandler);

routerDogs.get("/:id", getDogHandler);

routerDogs.post("/", createDogHandler);

 module.exports = routerDogs;