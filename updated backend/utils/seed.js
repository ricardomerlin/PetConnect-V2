const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Animal = require("../models/Animal");

dotenv.config();
const connectDB = require("../config/db");

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany();
  await Animal.deleteMany();

  // Seed one sample user
  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    savedAnimals: ["68b6218c00d1c837dbe21048", "68b6218c00d1c837dbe21049"]
  });

  // Seed detailed animals
  await Animal.insertMany([
    {
      petfinderId: 78055441,
      organization_id: "OH1145",
      url: "https://www.petfinder.com/dog/bo-78055441/oh/painesville/one-at-a-time-k-9-rescue-oh1145",
      type: "Dog",
      species: "Dog",
      breeds: {
        primary: "Black Mouth Cur",
        secondary: "Boxer",
        mixed: true,
        unknown: false,
      },
      colors: {
        primary: "Yellow / Tan / Blond / Fawn",
        secondary: "Black",
        tertiary: null,
      },
      age: "Baby",
      gender: "Male",
      size: "Large",
      coat: "Short",
      attributes: {
        spayed_neutered: true,
        house_trained: true,
        special_needs: false,
        shots_current: true,
      },
      environment: {
        children: true,
        dogs: true,
        cats: null,
      },
      tags: ["Affectionate", "Friendly", "Playful"],
      name: "Bo",
      description: "Bo is a 5 month old Boxer mix puppy. Friendly and energetic!",
      photos: [
        {
          small: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/dachshund.jpg?crop=1.00xw:0.668xh;0,0.260xh&resize=980:*",
          medium: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/dachshund.jpg?crop=1.00xw:0.668xh;0,0.260xh&resize=980:*",
          large: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/dachshund.jpg?crop=1.00xw:0.668xh;0,0.260xh&resize=980:*",
          full: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/dachshund.jpg?crop=1.00xw:0.668xh;0,0.260xh&resize=980:*",
        },
      ],
      status: "adoptable",
      contact: {
        email: "Oneatatimek9rescue@gmail.com",
        phone: null,
        address: {
          city: "Painesville",
          state: "OH",
          postcode: "44077",
          country: "US",
        },
      },
      createdAt: new Date(),
    },
    {
      petfinderId: 78055442,
      organization_id: "TX101",
      url: "https://www.petfinder.com/cat/luna-78055442/tx/houston/houston-cat-rescue-tx101",
      type: "Cat",
      species: "Cat",
      breeds: {
        primary: "Siamese",
        secondary: null,
        mixed: false,
        unknown: false,
      },
      colors: {
        primary: "Cream",
        secondary: "Brown",
        tertiary: null,
      },
      age: "Young",
      gender: "Female",
      size: "Medium",
      coat: "Short",
      attributes: {
        spayed_neutered: true,
        house_trained: true,
        special_needs: false,
        shots_current: true,
      },
      environment: {
        children: true,
        dogs: false,
        cats: true,
      },
      tags: ["Calm", "Gentle", "Loves to cuddle"],
      name: "Luna",
      description: "Luna is a sweet Siamese cat who loves attention.",
      photos: [
        {
          small: "https://hips.hearstapps.com/hmg-prod/images/shibainu-dog-royalty-free-image-1752089989.pjpeg?crop=1xw:1xh;center,top&resize=980:*",
          medium: "https://hips.hearstapps.com/hmg-prod/images/shibainu-dog-royalty-free-image-1752089989.pjpeg?crop=1xw:1xh;center,top&resize=980:*",
          large: "https://hips.hearstapps.com/hmg-prod/images/shibainu-dog-royalty-free-image-1752089989.pjpeg?crop=1xw:1xh;center,top&resize=980:*",
          full: "https://hips.hearstapps.com/hmg-prod/images/shibainu-dog-royalty-free-image-1752089989.pjpeg?crop=1xw:1xh;center,top&resize=980:*",
        },
      ],
      status: "adoptable",
      contact: {
        email: "houstoncatrescue@gmail.com",
        phone: "555-123-4567",
        address: {
          city: "Houston",
          state: "TX",
          postcode: "77001",
          country: "US",
        },
      },
      createdAt: new Date(),
    },
  ]);

  console.log("✅ Database seeded with user + animals!");
  process.exit();
};

seedData();