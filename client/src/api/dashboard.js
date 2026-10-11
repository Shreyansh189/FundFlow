import axios from './axios';

export const getDashboard = async () => {
  const response = await axios.get('/api/dashboard');
  return response.data;
};
