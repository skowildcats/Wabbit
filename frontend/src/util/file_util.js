import axios from 'axios'

export const fetchFiles = () => {
  return axios.get('/api/files/')
}