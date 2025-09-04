const express = require("express");
const { getUsers, createUser, getUserByEmail, logUserIn } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/email/:email", getUserByEmail);
router.post("/", createUser);
router.post("/login", logUserIn);

module.exports = router;