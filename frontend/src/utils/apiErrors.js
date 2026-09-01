export function publicFormError(error) {
  if (error?.response?.status === 429) {
    return 'Too many requests. Please wait a moment and try again.'
  }
  if (error?.response?.status === 400) {
    return 'Please review the form and correct any missing or invalid information.'
  }
  return 'Something went wrong. Please try again in a moment.'
}
