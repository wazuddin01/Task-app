const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const secret = require("../config/keys").secret;
module.exports = async (id, isVerified) => {
  const token = jwt.sign({ _id: id.toString(), isVerified }, secret, {
    expiresIn: "1hr"
  });
  return token;
};
