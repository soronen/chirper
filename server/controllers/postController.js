const Chirp = require("../models/ChirpModel");
const mongoose = require("mongoose");

// get all workouts
const getAll = async (req, res) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * 10;
  if (!req.user) {
    //all
    const all = await Chirp.find()
      .limit(10)
      .skip(skip)
      .sort("-createdAt")
      .lean();
    let out = all // residual
    console.log("standard frontpage");
    return res.status(200).json(out);
  } else {
    //personalized
    const all = await Chirp.find().sort("-createdAt").lean();
    //replace likes array with number of likes
    let out = all // residual
    //filtering algorithm :D
    let out_filtered = out.sort((x, y) => {
      let value = 0;
      if (
        req.user.follows.includes(x.username) &&
        !req.user.follows.includes(y.username)
      ) {
        value += 50;
      }
      if (x.createdAt < y.createdAt) {
        value += 50;
      }
      if (x.likes > y.likes) {
        value += 50;
      }
      if (value === 0) {
        value = -1;
      }
      return value;
    });
    //page system
    const slicedArray = out_filtered.slice(skip);
    return res.status(200).json(slicedArray);
  }
};

const post = async (req, res) => {
  const { content, images } = req.body;
  const { username } = req.user;

  const newPost = new Chirp({
    username: username,
    content: content,
    images: images,
    likes: [username],
  });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Internal server error" }).status(501);
  }
};

const like = async (req, res) => {
  const { postid } = req.body;
  const { username } = req.user;

  let post;
  try {
    post = await Chirp.findById(postid);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: "weird tweet id" });
  }

  if (!post) {
    return res.status(401).json({ error: "tweet not found" });
  }

  if (post.likes.includes(username)) {
    try {
      post.likes = post.likes.filter((element) => element !== username);
      await post.save();
      res.status(200).json({ status: "Disliked tweet" });
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ error: "Internal error" });
    }
  } else {
    try {
      post.likes.push(username);
      await post.save();
      res.status(200).json({ status: "Liked tweet" });
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ error: "Internal error" });
    }
  }
};

const deletePost = async (req, res) => {
  const { postid } = req.body;
  const { username } = req.user;

  let post;
  try {
    post = await Chirp.findById(postid);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: "Internal error " });
  }

  if (!post) {
    return res.status(401).json({ error: "tweet not found" });
  }

  if (post.username === username) {
    const _x = await Chirp.findByIdAndRemove(postid);
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
};

module.exports = {
  getAll,
  post,
  like,
  deletePost,
};
