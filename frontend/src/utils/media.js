export function resolveMediaUrl(value) {
  if (!value) return null

  try {
    return new URL(value).toString()
  } catch {
    const apiUrl = new URL(import.meta.env.VITE_API_BASE_URL, window.location.origin)
    const mediaPath = value.startsWith('/') ? value : `/${value}`
    return new URL(mediaPath, apiUrl.origin).toString()
  }
}
