import axios from 'axios';

export const fetchTask = (taskId) => {
  return axios.get(`/api/tasks/${taskId}`)
}

export const fetchTasksByUser = (userId) => {
  return axios.get(`/api/tasks/all/${userId}`)
}

export const createTask = (taskData) => {
  return axios.post('/api/tasks/new', taskData);
};

export const updateTask = (taskData) => {
  return axios.put(`/api/tasks/${taskData._id}`, taskData)
}

export const deleteTask = (taskId) => {
  return axios.delete(`/api/tasks/${taskId}`)
}

export const updateTaskOrder = (taskArr) => {
  return axios.post('/api/tasks/order', taskArr).then(res => {
    console.log(res)}).catch(err => {
      console.log(err)})
}