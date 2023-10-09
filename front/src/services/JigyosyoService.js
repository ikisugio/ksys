import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const JigyosyoService = {
  async getJigyosyoList() {
    const response = await axios.get(`${API_URL}/jigyosyos/`);
    return response.data;
  },

  async getJigyosyoById(id) {
    const response = await axios.get(`${API_URL}/jigyosyos/${id}/`);
    return response.data;
  },

  async createJigyosyo(data) {
    const response = await axios.post(`${API_URL}/jigyosyos/`, data);
    return response.data;
  },

  async updateJigyosyo(id, data) {
    const response = await axios.put(`${API_URL}/jigyosyos/${id}/`, data);
    return response.data;
  },

  async deleteJigyosyo(id) {
    const response = await axios.delete(`${API_URL}/jigyosyos/${id}/`);
    return response.status; // 200 for successful delete, 404 if not found, etc.
  },
};

export default JigyosyoService;
