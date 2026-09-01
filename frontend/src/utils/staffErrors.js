export function staffError(error) {
  if (error?.response?.status === 403) return 'You do not have permission to make this change.'
  if (error?.response?.status === 404) return 'The requested content could not be found.'
  if (error?.response?.status === 400) return 'Please review the highlighted information and try again.'
  return 'The staff service is temporarily unavailable. Please try again.'
}

export function fieldErrors(error, knownFields) {
  if (error?.response?.status !== 400 || !error.response.data) return {}
  return Object.fromEntries(knownFields.filter((field) => error.response.data[field]).map((field) => [field, error.response.data[field][0]]))
}
