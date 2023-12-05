import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const JigyosyoTransactionService = {
  async getJigyosyoTransactionList() {
    const response = await axios.get(`${API_URL}/jigyosyo-transactions/`);
    return response.data;
  },

  async getJigyosyoTransactionById(id) {
    const response = await axios.get(`${API_URL}/jigyosyo-transactions/${id}/`);
    return response.data;
  },

  async createJigyosyoTransaction(data) {
    const response = await axios.post(
      `${API_URL}/jigyosyo-transactions/`,
      data
    );
    return response.data;
  },

  async updateJigyosyoTransaction(id, data) {
    const response = await axios.put(
      `${API_URL}/jigyosyo-transactions/${id}/`,
      data
    );
    return response.data;
  },

  async deleteJigyosyoTransaction(id) {
    const response = await axios.delete(
      `${API_URL}/jigyosyo-transactions/${id}/`
    );
    return response.status; // 200 for successful delete, 404 if not found, etc.
  },
};

export default JigyosyoTransactionService;
