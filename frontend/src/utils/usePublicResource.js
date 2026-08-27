import { useEffect, useState } from 'react'

export function usePublicResource(request) {
  const [state, setState] = useState({ data: null, loading: true, error: false })

  useEffect(() => {
    let active = true
    request()
      .then((data) => active && setState({ data, loading: false, error: false }))
      .catch(() => active && setState({ data: null, loading: false, error: true }))
    return () => { active = false }
  }, [request])

  return state
}
