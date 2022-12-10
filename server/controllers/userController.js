const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// register :D
const register = async (req, res) => {
  const { username, password } = req.body;

  const existsAlready = await User.exists({ username });

  if (existsAlready) {
    res.json({ error: "User already exists" }).status(401);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);

  const register = await new User({
    username: req.body.username,
    passHash: passHash,
    description: "//todo",
    pfpUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    verified: "false",
    followers: [],
    following: [],
  });

  try {
    await register.save();
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Internal error" }).status(500);
    return;
  }

  let out = { username: username };

  if (isValid) {
    out.jwt = await jwt.sign({ username: username }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  } else {
    res.json({ error: "Invalid password" }).status(401);
    return;
  }

  res.json(out).status(200);
};


//login :D
const login = async (req, res) => {
  const { username, password } = req.body;

  const findOne = await User.findOne({ username });

  if (!findOne) {
    res.json({ error: "User doesn't exist" }).status(401);
    return;
  }

  let isValid;

  try {
    isValid = await bcrypt.compare(password, findOne.passHash);
  } catch (err) {
    console.log(err.message);
    res.json({ error: "Invalid password" }).status(401);
    return;
  }

  let out = { username: username };

  if (isValid) {
    out.jwt = await jwt.sign({ username: username }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  } else {
    res.json({ error: "Invalid password" }).status(401);
    return;
  }

  res.json(out).status(200);
};

const getUser = async (req, res) => {

  const username = req.params.id;

  const findOne = await User.findOne({ username });

  if (!findOne) {
    res.json({ error: "User doesn't exist" }).status(401);
    return;
  }

  res.json(findOne).status(200);
};

module.exports = {
  register,
  login,
  getUser,
};
