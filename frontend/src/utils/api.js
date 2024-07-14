import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the baseURL to your backend
});

export default api;
