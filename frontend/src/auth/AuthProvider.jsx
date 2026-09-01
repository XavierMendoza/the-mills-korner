import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getCurrentUser, login as requestLogin, logout as requestLogout, refreshAccessToken } from '../api/auth.js'
import apiClient from '../api/client.js'
import { clearRefreshToken, getRefreshToken, setRefreshToken } from '../utils/authStorage.js'
import AuthContext from './AuthContext.js'

let restorationPromise = null

async function restoreSession() {
  const refresh = getRefreshToken()
  if (!refresh) return null
  const tokens = await refreshAccessToken(refresh)
  setRefreshToken(tokens.refresh)
  return { access: tokens.access, user: await getCurrentUser(tokens.access) }
}

function guardedRestoration() {
  if (!restorationPromise) {
    const pending = restoreSession().catch(() => {
      clearRefreshToken()
      return null
    })
    restorationPromise = pending
    pending.finally(() => {
      if (restorationPromise === pending) restorationPromise = null
    })
  }
  return restorationPromise
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const refreshPromise = useRef(null)

  const clearAuth = useCallback(() => {
    clearRefreshToken()
    setAccessToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    let active = true
    guardedRestoration().then((session) => {
      if (!active) return
      setUser(session?.user || null)
      setAccessToken(session?.access || null)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  const login = useCallback(async (email, password) => {
    const tokens = await requestLogin(email, password)
    try {
      setRefreshToken(tokens.refresh)
      const currentUser = await getCurrentUser(tokens.access)
      setAccessToken(tokens.access)
      setUser(currentUser)
    } catch (error) {
      clearAuth()
      throw error
    }
  }, [clearAuth])

  const logout = useCallback(async () => {
    const refresh = getRefreshToken()
    try {
      if (accessToken && refresh) await requestLogout(accessToken, refresh)
    } finally {
      clearAuth()
    }
  }, [accessToken, clearAuth])

  const authenticatedRequest = useCallback(async (config) => {
    try {
      return await apiClient.request({ ...config, headers: { ...config.headers, Authorization: `Bearer ${accessToken}` } })
    } catch (error) {
      if (error.response?.status !== 401 || config._retried) throw error
      const refresh = getRefreshToken()
      if (!refresh) {
        clearAuth()
        throw error
      }
      try {
        if (!refreshPromise.current) {
          const pending = refreshAccessToken(refresh)
          refreshPromise.current = pending
          pending.then(() => {
            if (refreshPromise.current === pending) refreshPromise.current = null
          }, () => {
            if (refreshPromise.current === pending) refreshPromise.current = null
          })
        }
        const tokens = await refreshPromise.current
        setRefreshToken(tokens.refresh)
        setAccessToken(tokens.access)
        return apiClient.request({ ...config, _retried: true, headers: { ...config.headers, Authorization: `Bearer ${tokens.access}` } })
      } catch (refreshError) {
        clearAuth()
        throw refreshError
      }
    }
  }, [accessToken, clearAuth])

  const value = useMemo(() => ({ user, accessToken, loading, isAuthenticated: Boolean(user && accessToken), login, logout, authenticatedRequest }), [user, accessToken, loading, login, logout, authenticatedRequest])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
