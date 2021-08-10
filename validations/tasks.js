const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (!Validator.isLength(data.description, { min: 1, max: 100 })) {
    errors.description = "Task must be within 1 and 100 characters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (data.type === "timedGoal") {
    if (data.secondsLeft === 0) {
      errors.secondsLeft = "Hours/minutes is required"
    }
  } else {
    if (Validator.isEmpty(data.dueDate)) {
      errors.dueDate = "Due date/completed date is required"
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};