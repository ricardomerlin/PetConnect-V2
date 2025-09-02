const Animal = require("../models/Animal");

// @desc   Get all animals
// @route  GET /api/animals
const getAnimals = async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
};

// @desc   Create an animal
// @route  POST /api/animals
const createAnimal = async (req, res) => {
  const { name, species, age } = req.body;
  const animal = await Animal.create({ name, species, age });
  res.status(201).json(animal);
};

module.exports = { getAnimals, createAnimal };