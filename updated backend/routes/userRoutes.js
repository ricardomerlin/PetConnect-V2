const express = require("express");
const { getUsers, createUser, getUserByEmail } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/email/:email", getUserByEmail);
router.post("/", createUser);

module.exports = router;