const express = require("express");
const { getAnimals, createAnimal } = require("../controllers/animalController");

const router = express.Router();

router.get("/", getAnimals);
router.post("/", createAnimal);

module.exports = router;