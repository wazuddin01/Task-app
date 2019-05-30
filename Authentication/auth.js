const jwt = require("jsonwebtoken");
const secret = require("../config/keys").secret;
const User = require("../Models/User");
const isEmpty = require("../Validation/empty");
module.exports = async (req, res, next) => {
  try {
    //To Check the header is empty or not,if it's empty then send token value to empty string
    const token = isEmpty(req.header("Authorization").split(" ")[1])
      ? ""
      : req.header("Authorization").split(" ")[1];
    //If token is not recieved then return new error
    if (!token) {
      throw new Error("Cannot Authenticate User");
    }
    const verify = await jwt.verify(token, secret);
    const user = await new Promise((resolve, reject) => {
      User.findById(verify._id)
        .select("isVerified")
        .exec((err, user) => {
          if (err) {
            reject(err);
          }
          resolve(user.isVerified);
        });
    });
    //console.log(user);
    if (!user) {
      throw new Error("Please Verify your email");
    } else {
      console.log("calling next");
      next();
    }
  } catch (e) {
    return res.status(400).send({ status: 0, data: {}, Error: e.message });
  }
};
