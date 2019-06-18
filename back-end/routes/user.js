const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerValidation = require("../Validation/User");
const loginValidation = require("../Validation/login");
const createToken = require("../Authentication/jwt");

const User = require("../Models/User");
const secret = require("../config/keys").secret;
const sendEmail = require("../Authentication/sendemail");

//@route POST user/signup
//@desc Create User
//@access public
router.post("/signup", async (req, res) => {
  const { errors, isValid } = registerValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const { email, password, firstName, lastName } = req.body;
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, salt);
    //Save the current user
    const savedUser = await new User({
      email,
      password: hashPassword,
      firstName,
      lastName
    }).save();
    const token = await createToken(savedUser._id, savedUser.isVerified);
    //Send Verification Link to verify account
    sendEmail(firstName, token, email, false);
    return res.status(201).json({
      status: 1,
      message: "OK",
      data: { token }
    });
    //If user successfully saved
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errmsg);
  }
});

//@route POST user/login
//@desc Loginng user
//@access public
router.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const ismatched = await bycrypt.compare(password, user.password); //Password does not match
    if (!ismatched) {
      throw new Error("Password incorrect");
    }
    //Checking user Email is Verified or not
    // if (!user.isVerified) {
    //   throw new Error("Please verify your Email");
    // }
    //Destructuring user
    const { isVerified, firstName, lastName } = user;
    // creating token to send from server
    const token = await createToken(user._id, user.isVerified);
    return res.status(200).send({
      status: 1,
      data: { email, isVerified, firstName, lastName, token },
      Error: {}
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ status: 0, data: {}, Error: e.message });
  }
});

//@route GET user/verify
//@desc Verify user email
//@access private
router.get("/verify/:token", async (req, res) => {
  let { token } = req.params;
  try {
    const verify = await jwt.verify(token, secret);
    await User.findByIdAndUpdate(
      verify._id,
      {
        $set: { isVerified: true }
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ status: 1, data: { isVerified: true }, Error: {} });
  } catch (e) {
    return res.status(401).json({ status: 0, data: {}, Error: e.message });
  }
});

//@route POST user/forgot
//@desc Send Reset Password Email to user
//@access private
router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    const token = await jwt.sign({ _id: user._id }, secret, {
      expiresIn: "1hr"
    });
    sendEmail(user.firstName, token, email, true);
    return res
      .status(200)
      .json({ status: 0, data: { message: "Email has been sent" }, Error: {} });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ status: 0, data: {}, Error: e.message });
  }
});

//@route GET user/forgot/:token
//@desc Reset Password of user
//@access private
router.get("/forgot/:token", async (req, res) => {
  const { token } = req.params;
  console.log(token);
  try {
    const verify = await jwt.verify(token, secret);
    console.log(verify);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e.message);
  }
});

module.exports = router;
