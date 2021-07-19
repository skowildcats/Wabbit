export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const upload = (fileData) => {
    return axios.post('/api/upload', fileData)
}