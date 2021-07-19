const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    
  }
},{
  timestamps: true
})

module.exports = Task = mongoose.model('Task', TaskSchema)