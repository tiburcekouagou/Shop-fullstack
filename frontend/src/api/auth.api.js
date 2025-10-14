import axiosClient from './axiosClient'

export const register = async (payload) => {
  // post('http://localhost:5000/api/auth/register')
  // { payload: payload }
  axiosClient.post('/auth/register', { ...payload })
}

export const login = async (payload) => {
  axiosClient.post('/auth/login', { ...payload })
}

export const logout = async () => {
  axiosClient.post('/auth/logout')
}
