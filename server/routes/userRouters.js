const express = require("express");
const {
  register,
  login,
  getUser,
  editProfile,
  follow,
} = require("../controllers/userController");

const { auth } = require("../auth/authentication");
const router = express.Router();

// POST register request
router.post("/register", register);

// POST login request
router.post("/login", login);

// GET user
router.get("/:id", getUser);

//edit profile
router.patch("/editProfile", auth, editProfile);

//follow profile
router.patch("/follow", auth, follow);

module.exports = router;
