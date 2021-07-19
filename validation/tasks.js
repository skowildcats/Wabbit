const Validator = require('validator')
const validText = require('./valid-text')

module.exports = function validateTaskInput(data) {
    let errors = {};

    data.description = validText(data.description) ? data.description : ''

    if(!Validator.isLength(data.description, {min: 1, max: 100})){
        error.description = "Task must be within 1 and 100 characters"
    }

    if(Validator.isEmpty(data.description)){
        errors.description = 'Description field is required'
    }
    
}