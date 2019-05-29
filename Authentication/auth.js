const jwt = require("jsonwebtoken");
const secret = require("../config/keys").secret;
const User = require("../Models/User");
module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
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
    console.log(user);
    if (!user) {
      throw new Error("Please Verify your email");
    } else {
      console.log("calling next");
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ Error: e.message });
  }
};
