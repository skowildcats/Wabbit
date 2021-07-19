const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  completed: {
    type: String,
    default: false
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date
  },
  subtasks: {
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }
},{
  timestamps: true
})

leola

module.exports = Task = mongoose.model('Task', TaskSchema)