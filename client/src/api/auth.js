import axios from './axios';

export const register = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await axios.get('/api/auth/me');
  return response.data;
};
