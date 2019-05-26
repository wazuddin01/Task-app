const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");

const userRegistration = require("../Validation/User");
const User = require("../Models/User");

//@route POST user/signup
//@desc Create User
//@access public
router.post("/signup", async (req, res) => {
  const { errors, isValid } = userRegistration(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  return res.status(201).json(req.body);
});

module.exports = router;
