import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    api_key: import.meta.env.VITE_API_KEY,
    ...config.params,
  }

  return config
})
