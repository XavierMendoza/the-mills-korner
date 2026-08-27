import apiClient from './client.js'

const getPublicCollection = async (path) => {
  const response = await apiClient.get(path)
  return response.data
}

export const getOpportunityAreas = () => getPublicCollection('/public/opportunity-areas/')
export const getImpactMetrics = () => getPublicCollection('/public/impact-metrics/')
export const getStories = () => getPublicCollection('/public/stories/')
export const getPartners = () => getPublicCollection('/public/partners/')
export const getEvents = () => getPublicCollection('/public/events/')

const getPublicDetail = async (path) => {
  const response = await apiClient.get(path)
  return response.data
}

const encodedSlug = (slug) => encodeURIComponent(slug)

export const getOpportunityArea = (slug) => getPublicDetail(`/public/opportunity-areas/${encodedSlug(slug)}/`)
export const getStory = (slug) => getPublicDetail(`/public/stories/${encodedSlug(slug)}/`)
export const getEvent = (slug) => getPublicDetail(`/public/events/${encodedSlug(slug)}/`)
