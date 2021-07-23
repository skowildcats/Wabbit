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
    default: ["#eeeeee", "#d8d8d8", "#cacaca", "#808791", "#6c737c", "#5e6570", "#434349", "#26252b", "#1f1f1f" ],
  }
},{
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)