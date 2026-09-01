import apiClient from './client.js'

export const submitInquiry = (payload) => apiClient.post('/public/inquiries/', payload)
export const subscribeNewsletter = (email) => apiClient.post('/public/newsletter/subscribe/', { email })
