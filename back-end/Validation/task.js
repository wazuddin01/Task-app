const validator = require("validator");
const isEmpty = require("../Validation/empty");
module.exports = data => {
  let errors = {};
  data.title = isEmpty(data.title) ? "" : data.title;
  data.note = isEmpty(data.note) ? "" : data.note;

  if (!validator.isLength(data.title, { min: 3, max: 10 })) {
    errors.title = "Title should be in between 3-10";
  }
  if (validator.isEmpty(data.title)) {
    errors.title = "title cannot be Empty";
  }
  if (!validator.isLength(data.note, { min: 3 })) {
    errors.note = "Note length should more than 3";
  }
  if (validator.isEmpty(data.note)) {
    errors.note = "Note cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
