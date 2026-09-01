const REFRESH_TOKEN_KEY = 'tmk_staff_refresh_token'

// MVP compromise: production may move refresh handling to secure HttpOnly cookies
// if the backend authentication architecture changes.
export const getRefreshToken = () => sessionStorage.getItem(REFRESH_TOKEN_KEY)
export const setRefreshToken = (token) => sessionStorage.setItem(REFRESH_TOKEN_KEY, token)
export const clearRefreshToken = () => sessionStorage.removeItem(REFRESH_TOKEN_KEY)
