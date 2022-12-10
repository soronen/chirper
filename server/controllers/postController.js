const Chirp = require("../models/ChirpModel");
const mongoose = require("mongoose");

// get all workouts
const getAll = async (req, res) => {
    const page = req.query.page || 1;
    const skip = (page - 1) * 10;
  if (!req.user) {
    const all = await Chirp.find().limit(10).skip(skip);
    let out = [];
    res.json(all).status(200);
  } else {
    const all = await Chirp.find().limit(10).skip(skip);
    let out = [];
    res.json(all).status(200);
  }
};

const post = async (req, res) => {

    const {content, images} = req.body;
    const {username} = req.user;

    const newPost = new Chirp({
        username: username,
        content: content,
        images: images,
        likes: [username]
    }); 

    try {
        await newPost.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err.message)
        res.json({error : "Internal server error"}).status(501) 
    }
};

const like = async (req, res) => {


    const {postid} = req.body;
    const {username} = req.user;

    let post;
    try {
        post = await Chirp.findById(postid);
    } catch (err) {
        console.log(err.message)
        res.json({error : "weird tweet id"}).status(401);
        return;
    }

    if (!post) {
        res.json({error : "tweet not found"}).status(401);
        return;
    }

    if (post.likes.includes(username)) {
        try {
            post.likes = post.likes.filter(element => element !== username);
            await post.save();
            res.json({status : "Disliked tweet"}).status(200);
        } catch (err) {
            console.log(err.message);
            res.json({error: "Internal error"}).status(401);
        }
    } else {
        try {
            post.likes.push(username);
            await post.save();
            res.json({status : "Liked tweet"}).status(200);
        } catch (err) {
            console.log(err.message);
            res.json({error: "Internal error"}).status(401);
        }
    }
};

module.exports = {
  getAll,
  post,
  like,
};
