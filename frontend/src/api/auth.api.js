import axiosClient from './axiosClient'

export const register = async (payload) => {
  // post('http://localhost:5000/api/auth/register')
  // { payload: payload }
  return axiosClient.post('/auth/register', { ...payload })
}

export const login = async (payload) => {
  return axiosClient.post('/auth/login', { ...payload })
}

export const logout = async () => {
  return axiosClient.post('/auth/logout')
}
