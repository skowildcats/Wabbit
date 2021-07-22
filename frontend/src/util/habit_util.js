import axios from 'axios'

export const createHabit = (habit) => {
  return axios.post(`/api/habits/new`, habit);
}

export const fetchHabits = (userId) => {
  return axios.get(`/api/habits/all/${userId}`)
}