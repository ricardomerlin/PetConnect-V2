const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  petfinderId: Number, // maps to API's "id"
  organization_id: String,
  url: String,
  type: String,
  species: String,
  breeds: {
    primary: String,
    secondary: String,
    mixed: Boolean,
    unknown: Boolean,
  },
  colors: {
    primary: String,
    secondary: String,
    tertiary: String,
  },
  age: String,
  gender: String,
  size: String,
  coat: String,
  attributes: {
    spayed_neutered: Boolean,
    house_trained: Boolean,
    declawed: Boolean,
    special_needs: Boolean,
    shots_current: Boolean,
  },
  environment: {
    children: Boolean,
    dogs: Boolean,
    cats: Boolean,
  },
  tags: [String],
  name: String,
  description: String,
  photos: [
    {
      small: String,
      medium: String,
      large: String,
      full: String,
    },
  ],
  status: String,
  contact: {
    email: String,
    phone: String,
    address: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      postcode: String,
      country: String,
    },
  },
  published_at: Date,
  distance: Number,
});

module.exports = mongoose.model("Animal", animalSchema);
