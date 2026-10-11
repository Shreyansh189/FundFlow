import axios from './axios';

export const getStartups = async (params = {}) => {
  const response = await axios.get('/api/startups', { params });
  return response.data;
};

export const getStartupById = async (id) => {
  const response = await axios.get(`/api/startups/${id}`);
  return response.data;
};

export const createStartup = async (startupData) => {
  const response = await axios.post('/api/startups', startupData);
  return response.data;
};

export const updateStartup = async (id, startupData) => {
  const response = await axios.put(`/api/startups/${id}`, startupData);
  return response.data;
};

export const deleteStartup = async (id) => {
  const response = await axios.delete(`/api/startups/${id}`);
  return response.data;
};
