import axios from 'axios'

export const createHabit = (habit) => {
  return axios.post(`/api/habits/new`, habit);
}
