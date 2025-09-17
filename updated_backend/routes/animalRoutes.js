const express = require("express");
const { getAnimalsFromDB, createAnimal, getAnimalsFromPetfinder, exampleEndpoint } = require("../controllers/animalController");

const router = express.Router();

router.get("/", getAnimalsFromDB);
router.get("/animals", getAnimalsFromPetfinder)
router.post("/", createAnimal);


module.exports = router;