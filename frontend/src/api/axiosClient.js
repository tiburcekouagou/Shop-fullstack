import axios from 'axios'
import { useAuth } from '../../composables/auth'
import { getCookie } from '@/utils'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

// Interceptor pour ajouter le token d'accès à chaque requête
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor pour gérer les erreurs de réponse
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const accessToken = getCookie('accessToken')

    if (error.response?.status === 401) {
      // on raffraîchit le token d'accès
      try {
        await axiosClient.post('/auth/refresh')
        const newAccessToken = getCookie('accessToken')
        useAuth().setAccessToken(newAccessToken)

        // on réessaye la requête initiale
        if (error.config && accessToken !== newAccessToken) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosClient.request(error.config)
        }
      } catch (error) {
        console.error(error)
        useAuth().logout()
        window.location.href = '/login'

      }
    }
  }
)
export default axiosClient
