import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  async get(endpoint, config = {}) {
    return this.client.get(endpoint, config);
  }

  async post(endpoint, data, config = {}) {
    return this.client.post(endpoint, data, config);
  }

  async put(endpoint, data, config = {}) {
    return this.client.put(endpoint, data, config);
  }

  async delete(endpoint, config = {}) {
    return this.client.delete(endpoint, config);
  }
}

const apiService = new ApiService(process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001');
export default apiService;