import axios from "axios";

const API_URL = "https://65420d08f0b8287df1ff6761.mockapi.io/users";

export const listUser = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.get(API_URL, userData);
  return response.data;
};

export const retrieveUser = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/{id}`, userData);
  return response.data;
};

export const destroyUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
