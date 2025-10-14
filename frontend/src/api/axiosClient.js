import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const axiosClient = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
})

export default axiosClient
