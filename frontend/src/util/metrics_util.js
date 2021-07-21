import axios from 'axios';

export const fetchUserMetrics = (userId) => {
  return axios.get(`/api/metrics/${userId}`)
}