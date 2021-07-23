import axios from 'axios';

// We've been using this method in previos steps
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => (
  axios.post('/api/users/register', userData)
);

export const login = (userData) => (
  axios.post('/api/users/login', userData)
);

export const getCurrentUser = currentUserId => (
  axios.get(`/api/users/${currentUserId}`)
);

export const patchUser = userData => (
  axios.put(`/api/users/info`, userData)
);