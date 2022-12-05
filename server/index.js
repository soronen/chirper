const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');

var server = express();
server.use(morgan(':remote-addr :method :url :status'));
server.use(express.json());

mongoose.connect(process.env.DB_URL);
const Chirp = require('./models/ChirpModel');
const User = require('./models/userModel');



function validate(token){

    try {
        const out = jwt.verify(token, process.env.SECRET_KEY);
        return {payload : out, valid: true};
    } catch (err) {
        console.log("jwt verification error : ", err.message);
        return {payload : err.message, valid: false};
    }

}


 /** 
* @api {get} /chirps Get all chirps
* @apiName GetChirps
* @apiGroup Chirps
* 
* @apiSuccess {Array} chirps Array of all chirps
* 
* @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
* [
*     {
*         "username": "johnsmith",
*         "content": "This is my first chirp!",
*         "images": ["image1.jpg", "image2.jpg"],
*         "likes": 0
*     },
*     {
*         "username": "janesmith",
*         "content": "I love chirping!",
*         "images": ["image3.jpg"],
*         "likes": 5
*     }
* ]
*/
server.get('/chirps', async (req, res) => {
    
    Chirp.find().then(x => {

        res.status(200).json(x).send();

    })
})

/** 
* @api {get} /:id Get user by username
* @apiName GetUser
* @apiGroup User
* 
* @apiParam {String} username User's username
* 
* @apiSuccess {Object} user User object
* 
* @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
* {
*     "username": "johnsmith",
*     "name": "John Smith",
*     "email": "johnsmith@gmail.com",
*     "followers": ["janesmith", "johndoe"],
*     "following": ["johndoe", "janedoe"]
* }
* 
* @apiError (Error 404) UserNotFound The <code>username</code> of the User was not found.
* 
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 404 Not Found
* {
*     "error": "User not found"
* }
*/
server.get('/:id', async (req, res) => {
    
    User.exists({username : req.params.id}).then(x => {
        if (x == null) {
            res.status(404).send();
        } else {
            User.findById(x._id).then(out => {
                res.status(200).json(out).send();
            }).catch(err => {
                console.log(err.message);
                res.status(403).send();
            })
        }
    })

})

/** 
* @api {post} /chirp Post a new chirp
* @apiName PostChirp
* @apiGroup Chirp
* 
* @apiParam {String} jwt JSON Web Token for authentication
* @apiParam {String} content Chirp content
* @apiParam {Array} images Array of image URLs
* 
* @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
* 
* @apiError (Error 520) InvalidJWT The provided JWT is invalid.
* 
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 520 Invalid JWT
* {
*     "error": "Invalid JWT token"
* }
*/
server.post('/chirp', async (req, res) => {

    let jwtdata = validate(req.body.jwt);

    if (!jwtdata.valid){
        res.status(520).json({error: "invalid jwt token"}).send();
        return;
    }

    const newPost = new Chirp({
        username: jwtdata.payload.username,
        content: req.body.content,
        images: req.body.images,
        likes: 0
    }); 

    newPost.save().then((out) => {
        res.status(200).send();
    }).catch((err) => {
        console.log(err.message);
        res.status(403).send();
    })
   
})

/** 
* @api {post} /register Register a new user
* @apiName Register
* @apiGroup User
* 
* @apiParam {String} username User's username
* @apiParam {String} password User's password
* 
* @apiSuccess {String} jwt JSON Web Token for authentication
* 
* @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
* {
*     "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
* }
* 
* @apiError (Error 403) UserExists The provided <code>username</code> is already taken.
* 
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 403 Forbidden
* {
*     "message": "User already exists"
* }
*/
server.post('/register', async (req, res) => {
    
    await User.exists({username: req.body.username}).then((out) => {
        if (out != null){
            res.status(403).json({message : "user already exists"}).send();
            return;
        }
    });

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(req.body.password, salt);

    const register = await new User({
        username: req.body.username,
        passHash: passHash,
        description: "//todo",
        pfpUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
        verified: "false",
        followers: [],
        following: []
    })

    await register.save().catch(err => {
        console.log(err.message);
        res.status(520).send();
    })

    const token = jwt.sign({username : req.body.username}, process.env.SECRET_KEY, {expiresIn:'24h'});

    res.json({jwt : token}).status(200).send();

})

/** 
* @api {post} /login Login using username and password
* @apiName Login
* @apiGroup User
* 
* @apiParam {String} username User's username
* @apiParam {String} password User's password
* 
* @apiSuccess {String} jwt JSON Web Token for authentication
* 
* @apiSuccessExample {json} Success-Response:
* HTTP/1.1 200 OK
* {
*     "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
* }
* 
* @apiError (Error 404) UserNotFound The provided <code>username</code> was not found.
* 
* @apiError (Error 403) InvalidPassword The provided <code>password</code> is incorrect.
* 
* @apiErrorExample {json} Error-Response:
* HTTP/1.1 403 Forbidden
* {
*     "error": "Invalid password"
* }
*/
server.post('/login', async (req, res) => {
    

    await User.exists({username : req.body.username}).then(x => {
        if (x == null) {
            res.status(404).send();
        } else {
            User.findById(x._id).then(out => {

                const compare = bcrypt.compare(req.body.password, out.passHash).then(isequal => {
                    
                    if (isequal) {
                        const token = jwt.sign({username : req.body.username}, process.env.SECRET_KEY, {expiresIn:'24h'});
                        res.json({jwt : token}).status(200).send();
                    } else {
                        console.log("signing error ", compare);
                        res.status(403).json({error: "invalid password"}).send();
                    }

                }).catch(err => {
                    console.log(err.message);
                    res.status(403).send();
                })

            }).catch(err => {
                console.log("login err", err.message);
                res.status(403).send();
            })
        }
    })
    

})

server.listen(3000, async () => {
    console.log("Server running on port 3000");
});