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


//validoi jwt tokeni.
function validate(token){

    try {
        const out = jwt.verify(token, process.env.SECRET_KEY);
        return {payload : out, valid: true};
    } catch (err) {
        console.log("jwt verification error : ", err.message);
        return {payload : err.message, valid: false};
    }

}


//hae kaikki postit
server.get('/chirps', async (req, res) => {
    
    Chirp.find().then(x => {

        res.status(200).json(x).send();

    })
})

//etsi käyttäjä / ja palauttaa tän jos on olemassa
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

//laheta posti
//ottaa vastaan json bodyn parametreillä content,images[],jwt
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

//rekisteröityminen ottaa json parametreina username ja password
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

//login using username and password
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