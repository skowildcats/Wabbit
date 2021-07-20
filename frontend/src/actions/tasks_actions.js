import * as TaskUtil from '../util/tasks_util'

export const RECEIVE_USER_TASKS = "RECEIVE_TASKS"
export const RECEIVE_TASK = "RECEIVE_TASK"
export const REMOVE_TASK = "REMOVE_TASK"

export const receiveUserTasks = tasks => ({
  type: RECEIVE_USER_TASKS,
  tasks
});

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

export const removeTask = taskId => ({
    type: REMOVE_TASK,
    taskId
})

export const fetchTasks = (userId) => dispatch => (
    TaskUtil.fetchTasksByUser(userId).then(tasks => dispatch(receiveUserTasks(tasks)))
    .catch(err => cosole.log(err))
)

export const fetchTask = (taskId) => dispatch => (
    TaskUtil.fetchTask(taskId).then(task => dispatch(receiveTask(task)))
    .catch(err => console.log(err))
)

export const createTask = (task) => dispatch => (
    TaskUtil.createTask(task).then(task => dispatch(receiveTask(task)))
    .catch(err => console.log(err))
)

