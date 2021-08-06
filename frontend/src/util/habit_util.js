import axios from 'axios'

export const createHabit = (habit) => {
  return axios.post(`/api/habits/new`, habit);
}

export const fetchHabits = (userId) => {
  return axios.get(`/api/habits/all/${userId}`)
}

export const updateHabit = (habit) => {
  return axios.put(`/api/habits/${habit.id}`,habit)
}

export const deleteHabit = (habitId) => {
  return axios.delete(`/api/habits/${habitId}`)
}

export const updateHabitOrder = (habitArr) => {
  return axios.post('/api/habits/order', habitArr).then(res => {
    console.log(res)}).catch(err => {
      console.log(err)})
}