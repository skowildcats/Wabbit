import axios from 'axios'

export const fetchFiles = () => {
  console.log('Fetched from backend')
  return axios.get('/api/files/')
}