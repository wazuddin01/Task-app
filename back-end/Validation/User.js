const validator = require("validator");
const isEmpty = require("../Validation/empty");
module.exports = data => {
  let errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;

  if (validator.isEmpty(data.email)) {
    errors.email = "Email cannot be Empty";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is badly formatted";
  }
  if (!validator.isLength(data.password, { min: 6, max: 10 })) {
    errors.password = "Password length should be in between 6-10";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }
  if (!validator.isLength(data.firstName, { min: 3 })) {
    errors.firstName = "First Name length should more than 3";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name cannot be empty";
  }
  if (!validator.isLength(data.lastName, { min: 3 })) {
    errors.lastName = "Last Name length should more than 3";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name cannot be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
