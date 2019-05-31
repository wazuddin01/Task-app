const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const secret = require("../config/keys").secret;
module.exports = async id => {
  const token = jwt.sign({ _id: id.toString() }, secret, { expiresIn: "1hr" });
  return token;
};

