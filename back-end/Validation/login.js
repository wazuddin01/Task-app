const validator = require("validator");
const isEmpty = require("../Validation/empty");
module.exports = data => {
  let errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is badly formatted";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email cannot be Empty";
  }
  if (!validator.isLength(data.password, { min: 4 })) {
    errors.password = "Password length should be more than 4";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
