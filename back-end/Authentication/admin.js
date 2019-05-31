const jwt = require("jsonwebtoken");
const secret = require("../config/keys").secret;
const User = require("../Models/User");
const isEmpty = require("../Validation/empty");

module.exports = async id => {
  try {
    //To Check the header is empty or not,if it's empty then send token value to empty string
    const token = isEmpty(req.header("Authorization").split(" ")[1])
      ? ""
      : req.header("Authorization").split(" ")[1];
    //If token is not recieved then return new error
    if (!token) {
      throw new Error("Cannot Authenticate User");
    }
    //Verify the jwt token from header
    const verify = await jwt.verify(token, secret);
    const role = await User.findById(verify._id).select("role");
  } catch (e) {
    console.log(e);
    return res.status(400).json(e.message);
  }
};
