import axios from "axios";
import axiosRetry from "axios-retry";

const TAX_API_BASE_URL = process.env.TAX_API_BASE_URL;

const api = axios.create({
  baseURL: TAX_API_BASE_URL,
  // timeout: 1000,
});

axiosRetry(api, {
  retries: 2,
  retryCondition: (error) => {
    if (!error.response?.status) {
      return false;
    }

    return 500 <= error.response.status;
  },
});

export default api;
