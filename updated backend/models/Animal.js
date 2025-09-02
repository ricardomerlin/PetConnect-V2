const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    petfinderId: { type: Number, unique: true },
    organization_id: String,
    url: String,
    type: String,
    species: String,
    breeds: Object,
    colors: Object,
    age: String,
    gender: String,
    size: String,
    coat: String,
    attributes: Object,
    environment: Object,
    tags: [String],
    name: String,
    description: String,
    photos: [Object],
    status: String,
    contact: Object,
  },
  { timestamps: true, collection: "animals" }
);

module.exports = mongoose.model("Animal", animalSchema);
