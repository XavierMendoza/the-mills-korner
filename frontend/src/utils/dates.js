export const formatDate = (value) => new Date(value).toLocaleString([], {
  dateStyle: 'long',
  timeStyle: 'short',
})
