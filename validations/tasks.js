const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (data.type === "timedGoal") {
    if (data.secondsLeft === 0 || data.secondsLeft === null) {
      errors.secondsLeft = "Hours/minutes is required"
    }
  } else {
    // if (Validator.isEmpty(data.dueDate)) {
    //   errors.dueDate = "Due date/completed date is required"
    // }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};