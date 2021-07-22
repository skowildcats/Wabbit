const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = validText(data.firstName) ? data.firstName : '';
  data.lastName = validText(data.lastName) ? data.lastName : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.confirmPassword = validText(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.firstName, { max: 30 })) {
    errors.firstName = 'Must be under 30 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'This field is required';
  }

  if (!Validator.isLength(data.lastName, { max: 30 })) {
    errors.lastName = 'Must be under 30 characters';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "This field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "This field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};