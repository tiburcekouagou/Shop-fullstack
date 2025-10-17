import axiosClient from "@/api/axiosClient"
import { getCookie } from "@/utils"
import { computed, ref } from "vue"

const user = ref(null)
const accessToken = computed(() => getCookie('accessToken') || null)
const isAuthenticated = computed(() => !!user.value)

export function useAuth() {
  function setUser(userData) {
    user.value = userData
  }

  /**
   * Définir le token d'accès (access token)
   * @param {string} token le token JWT
   */
  function setAccessToken(token, expiresAt) {
    accessToken.value = token
    // stocker l'accessToken dans les cookies
    document.cookie = `accessToken=${token}; path=/;expires=${new Date(Date.now() + expiresAt).toUTCString()}`
  }

  /**
   * Effacer les données d'authentification
   */
  function clearAuth() {
    user.value = null
    accessToken.value = null
  }

  /**
   * Connexion d'un utilisateur
   * @param {Object} payload les données de connexion (email, password)
   * @returns
   */
  async function login(payload) {
    const res = await axiosClient.post('/auth/login', { ...payload })
    console.log({res})
    setAccessToken(res.data.accessToken, res.data.expiresAt)
  }

  function logout() {
    clearAuth()
    axiosClient.post('/auth/logout')
  }

  function register() {  }


  return  {
    user,
    accessToken, login, logout, register,
    isAuthenticated,
    setUser,
    setAccessToken,
    clearAuth
  }
}
