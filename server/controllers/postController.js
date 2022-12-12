const Chirp = require("../models/ChirpModel");
const mongoose = require("mongoose");

// get all workouts
const getAll = async (req, res) => {
    const page = req.query.page || 1;
    const skip = (page - 1) * 10;
  if (!req.user) { //all
    console.log('standard frontpage')
    const all = await Chirp.find().limit(10).skip(skip).sort('-createdAt').lean();
    let out = all
    res.status(200)
    res.json(out)
    return;
  } else { //personalized
    const all = await Chirp.find().sort('-createdAt').lean();    
    //replace likes array with number of likes
    let out = all
    //filtering algorithm :D
    let out_filtered = out.sort((x, y) => {
        let value = 0;
        if (req.user.follows.includes(x.username) && !req.user.follows.includes(y.username)) {
            value += 50;
        }
        if (x.createdAt < y.createdAt) {
            value += 50;
        }
        if (x.likes > y.likes) {
            value += 50;
        }
        return value;
    })
    //page system
    const slicedArray = out_filtered.slice(skip);
    res.json(slicedArray).status(200);
    return;
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
        res.json(newPost).status(200);
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
        return res.json({error : "weird tweet id"}).status(401);
    }

    if (!post) {
        return res.json({error : "tweet not found"}).status(401);
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

const deletePost = async (req, res) => {

    const {postid} = req.body;
    const {username} = req.user;

    let post;
    try {
        post = await Chirp.findById(postid);
    } catch (err) {
        console.log(err.message)
        return res.json({error : "Internal error "}).status(401);
    }

    if (!post) {
        return res.json({error : "tweet not found"}).status(401);
    }

    if (post.username === username){
        const _x = await Chirp.findByIdAndRemove(postid);
        res.sendStatus(200);
        return;
    } else {
        res.sendStatus(401);
        return;
    }
};

module.exports = {
  getAll,
  post,
  like,
  deletePost
};
