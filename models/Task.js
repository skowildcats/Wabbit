const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    subtasks: {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }
})

module.exports = Task = mongoose.model('task', TaskSchema)