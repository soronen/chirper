const jsonwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  // verify user is authenticated
  const { jwt } = req.body;

  if (!jwt) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const { username } = jsonwt.verify(jwt, process.env.SECRET_KEY);
    req.user = await User.findOne({ username });
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

//determine if user feed will be personalized based on the presence of a jwt token in the req body
const personalizationCheck = async (req, res, next) => {
  // verify user is authenticated
  const { jwt } = req.body;

  if (!jwt) {
    return next();
  }

  try {
    const { username } = jsonwt.verify(jwt, process.env.SECRET_KEY);
    req.user = await User.findOne({ username: username });
    next();
  } catch (error) {
    console.log(error.message);
    next();
  }
};

module.exports = { auth, personalizationCheck };
