const express = require("express");
const {
  getAll,
  like,
  post,
  deletePost,
} = require("../controllers/postController");

const { auth, personalizationCheck } = require("../auth/authentication");

const router = express.Router();

// GET all posts
router.get("/getAll", personalizationCheck, getAll);

//POST a post :D
router.post("/post", auth, post);

// GET user
router.patch("/like", auth, like);

//delete post
router.delete("/deletePost", auth, deletePost);

module.exports = router;
