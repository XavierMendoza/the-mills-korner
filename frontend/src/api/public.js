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
