const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");

const userRegistration = require("../Validation/User");
const createToken = require("../Authentication/jwt");
const auth = require("../Authentication/auth");
const User = require("../Models/User");

//@route POST user/signup
//@desc Create User
//@access public
router.post("/signup", async (req, res) => {
  const { errors, isValid } = userRegistration(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const salt = await bycrypt.genSalt(10);
    const password = await bycrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    //Save the current user
    const savedUser = await user.save();
    const token = await createToken(savedUser._id);
    console.log(token);
    //Send Verification Link to verify account

    //If user successfully saved
    return res.status(201).json({
      status: 1,
      message: "OK",
      result: "your account has been created"
    });
  } catch (e) {
    //If email already exists
    if (e.code == 11000) {
      return res.status(400).json({
        status: 0,
        message: "Email already exists"
      });
    }
    //Else return error
    return res.status(400).send(e);
  }
});

//@route POST user/login
//@desc Loginng user
//@access public
router.post("/login", auth, async (req, res) => {
  
});
module.exports = router;
