const mongoose = require("mongoose");
const validator = require("Validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    minlength: 5
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ],

  Date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("User", UserSchema);
