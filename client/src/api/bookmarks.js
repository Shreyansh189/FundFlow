import axios from './axios';

export const getBookmarks = async () => {
  const response = await axios.get('/api/bookmarks');
  return response.data;
};

export const createBookmark = async (startupId) => {
  const response = await axios.post(`/api/bookmarks/${startupId}`);
  return response.data;
};

export const deleteBookmark = async (startupId) => {
  const response = await axios.delete(`/api/bookmarks/${startupId}`);
  return response.data;
};
