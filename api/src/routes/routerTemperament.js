const express = require('express');
const routerTemperament = express.Router()

const { getTempHandler } = require("../handlers/TemperamentHandler")

routerTemperament.get("/", getTempHandler);

// routerTemperament.post("/", createDogHandler);

module.exports = routerTemperament;