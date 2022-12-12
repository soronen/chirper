const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// register :D
const register = async (req, res) => {
  const { username, password } = req.body;

  const existsAlready = await User.exists({ username });

  if (existsAlready) {
    return await res.json({ error: "User already exists" }).status(401);
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
    register.save();
  } catch (err) {
    console.log(err.message);
    return res.json({ error: "Internal error" }).status(500);
  }

  let out = { username: username };

  out.jwt = jwt.sign({ username: username }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  return res.json(out).status(200);
};

//login :D
const login = async (req, res) => {
  const { username, password } = req.body;

  const findOne = await User.findOne({ username });

  if (!findOne) {
    return res.status(500).json({ error: "User doesn't exist" });
  }

  let isValid;

  try {
    isValid = await bcrypt.compare(password, findOne.passHash);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Invalid password" });
  }

  let out = { username: username };

  if (isValid) {
    out.jwt = await jwt.sign({ username: username }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  } else {
    return res.status(401).json({ error: "Invalid password" });
  }

  return res.status(200).json(out);
};

const getUser = async (req, res) => {
  const username = req.params.id;

  const findOne = await User.findOne({ username }).lean();

  if (!findOne) {
    return res.status(401).json({ error: "User doesn't exist" });
  }

  delete findOne.passHash;

  res.status(200).json(findOne);
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
    return res.status(401).json({ error: "User doesn't exist" });
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
