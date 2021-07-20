import axios from 'axios'

export const fetchImages = () => {
  return axios.get('/api/files/')
}