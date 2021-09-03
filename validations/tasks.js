const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (!data.color){
    errors.color = 'Select a color for this task'
  }

  if (Validator.isEmpty(data.icon)) {
    errors.icon = 'Select an icon for this task';
  }

  if (data.type === "timedGoal") {
    if (data.secondsLeft === 0 || data.secondsLeft === null) {
      errors.secondsLeft = "Hours/minutes is required"
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};