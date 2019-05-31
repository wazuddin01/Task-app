const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminRegistration = require("../Validation/User");
const createToken = require("../Authentication/jwt");

const User = require("../Models/User");
const secret = require("../config/keys").secret;

//@route POST admin/signup
//@desc Creating Admin
//@access Admin
router.post("/signup", async (req, res) => {
  const { errors, isValid } = adminRegistration(req.body);
  if (!isValid) {
    return res.status(400).json({ status: 0, data: {}, Errors: errors });
  }
  try {
    const { email, password, firstName, lastName } = req.body;
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, salt);
    const admin = await new User({
      email,
      password: hashPassword,
      firstName,
      lastName,
      role: "admin"
    }).save();
    return res
      .status(201)
      .json({ status: 1, data: { email, firstName, lastName }, Error: {} });
  } catch (e) {
    //If email already exists
    if (e.code == 11000) {
      return res.status(400).json({
        status: 0,
        data: {},
        Error: { message: "Email already exists" }
      });
    }
    //Else return error
    return res.status(400).send(e);
  }
});

//@route POST admin/login
//@desc Loginng Admin
//@access Admin
router.post("/login", async (req, res) => {
    
});

module.exports = router;
