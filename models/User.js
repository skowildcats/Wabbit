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
    default: ["#808791", "#6c737c", "#5e6570", "#666581", "#6f819f", "#354b82", "#21355e", "#40444f", "#111111"],
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
    default: false
  },
  lastCheckedDate: {
    type: Date,
    default: new Date()
  }
},{
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)