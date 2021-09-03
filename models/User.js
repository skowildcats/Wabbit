const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  theme: {
    type: Array,
    default: ["#CCCCCC", "#AAAAAA", "#878787", "#AE7675","#837E72", "#C7B97A", "#99AC89", "#799198", "#876E87"],
  },
  tasks: {
    type: Array,
    default: []
  },
  habits: {
    type: Array,
    default: []
  },
  walkthrough: {
    type: Boolean,
    default: true
  },
  lastCheckedDate: {
    type: Date,
    default: new Date()
  }
},{
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)