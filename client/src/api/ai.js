import axios from './axios';

export const generateStartupPitch = async (startupId) => {
  const response = await axios.post(`/api/ai/startup-summary/${startupId}`);
  return response.data;
};
