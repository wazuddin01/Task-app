const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegistration = require("../Validation/User");
const createToken = require("../Authentication/jwt");

const User = require("../Models/User");
const secret = require("../config/keys").secret;

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

    //Send Verification Link to verify account

    //If user successfully saved
    return res.status(201).json({
      status: 1,
      message: "OK",
      data: { token }
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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const ismatched = await bycrypt.compare(password, user.password); //Password does not match
    if (!ismatched || !user) {
      throw new Error("Password or Email incorrect");
    }
    //Checking user Email is Verified or not
    if (!user.isVerified) {
      throw new Error("Please verify your Email");
    }
    //Destructuring user
    const { isVerified, firstName, lastName } = user;
    // creating token to send from server
    const token = await createToken(user._id);
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

router.post('/sendverification',async (req,res)=>{
  const token = req.header("Authorization").split(" ")[1];
  
})
module.exports = router;
