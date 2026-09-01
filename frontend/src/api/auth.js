import apiClient from './client.js'

export const login = (email, password) => apiClient.post('/auth/token/', { email, password }).then(({ data }) => data)
export const refreshAccessToken = (refresh) => apiClient.post('/auth/token/refresh/', { refresh }).then(({ data }) => data)
export const getCurrentUser = (access) => apiClient.get('/auth/me/', { headers: { Authorization: `Bearer ${access}` } }).then(({ data }) => data)
export const logout = (access, refresh) => apiClient.post('/auth/logout/', { refresh }, { headers: { Authorization: `Bearer ${access}` } })
