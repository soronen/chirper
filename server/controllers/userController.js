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

  out.jwt = jwt.sign({ username: username }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

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

  const findOne = await User.findOne({ username }).lean();

  if (!findOne) {
    res.json({ error: "User doesn't exist" }).status(401);
    return;
  }

  delete findOne.passHash;

  res.json(findOne).status(200);
};

const editProfile = async (req, res) => {
  const { username } = req.user;
  const { description, pfpUrl } = req.body;

  let updater = {};

  if (description) {
    updater.description = description;
  }
  if (pfpUrl) {
    updater.pfpUrl = pfpUrl;
  }

  const my_user = await User.findOneAndUpdate({ username }, updater);

  res.sendStatus(200);
};

const follow = async (req, res) => {
  const { username } = req.user;
  const toFollow = req.body.username;

  const me = await User.findOne({ username });
  const target = await User.findOne({ username: toFollow });

  if (!target) {
    res.json({ error: "User doesn't exist" }).status(401);
    return;
  }

  let me_list = me.follows;
  let target_list = target.followers;

  if (me_list.includes(toFollow)) {
    me_list = me_list.filter((element) => element !== toFollow);
    target_list = target_list.filter((element) => element !== username);
    await User.findOneAndUpdate({ username }, { follows: me_list });
    await User.findOneAndUpdate(
      { username: toFollow },
      { followers: target_list }
    );
  } else {
    me_list.push(toFollow);
    target_list.push(username);
    await User.findOneAndUpdate({ username }, { follows: me_list });
    await User.findOneAndUpdate(
      { username: toFollow },
      { followers: target_list }
    );
  }

  res.sendStatus(200);
};

module.exports = {
  register,
  login,
  getUser,
  editProfile,
  follow,
};
