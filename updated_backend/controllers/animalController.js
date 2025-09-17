const Animal = require("../models/Animal");

// @desc   Get all animals from MongoDB
// @route  GET /api/animals
const getAnimalsFromDB = async (req, res, next) => {
  console.log('GETTING ANIMALS FROM DB')
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    next(err);
  }
};

// @desc   Create an animal in MongoDB
// @route  POST /api/animals
const createAnimal = async (req, res, next) => {
  try {
    const { name, species, age } = req.body;
    const animal = await Animal.create({ name, species, age });
    res.status(201).json(animal);
  } catch (err) {
    next(err);
  }
};



const getAnimalsFromPetfinder = async (req, res, next) => {
  console.log("FETCHING ANIMALS FROM PETFINDER");
  try {
    // Token request
    const tokenRes = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.PETFINDER_API_KEY,
        client_secret: process.env.PETFINDER_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    let savedAnimals = [];

    // Loop through pages 1–10
    for (let page = 1; page <= 10; page++) {
      const animalsRes = await fetch(
        `https://api.petfinder.com/v2/animals?limit=100&page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const animalsData = await animalsRes.json();

      const pageSaved = await Promise.all(
        animalsData.animals.map((animal) =>
          Animal.findOneAndUpdate(
            { petfinderId: animal.id },
            {
              petfinderId: animal.id,
              organization_id: animal.organization_id,
              url: animal.url,
              type: animal.type,
              species: animal.species,
              breeds: animal.breeds,
              colors: animal.colors,
              age: animal.age,
              gender: animal.gender,
              size: animal.size,
              coat: animal.coat,
              attributes: animal.attributes,
              environment: animal.environment,
              tags: animal.tags,
              name: animal.name,
              description: animal.description,
              photos: animal.photos,
              status: animal.status,
              contact: animal.contact,
              published_at: animal.published_at,
              distance: animal.distance,
            },
            { new: true, upsert: true }
          )
        )
      );

      savedAnimals = savedAnimals.concat(pageSaved);
    }

    if (req) {
      // Only send response if this is called via API
      res.json(savedAnimals);
    }

    console.log(`✅ Synced ${savedAnimals.length} animals from Petfinder`);
  } catch (err) {
    if (next) next(err);
    else console.error("Petfinder sync error:", err);
  }
};

module.exports = { getAnimalsFromDB, createAnimal, getAnimalsFromPetfinder };
