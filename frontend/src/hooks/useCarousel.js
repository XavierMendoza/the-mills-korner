import { useEffect, useState } from 'react'

export default function useCarousel(count, delay) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [reduced, setReduced] = useState(true)
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const paused = reduced || stopped || hovered || focused
  useEffect(() => {
    if (paused || count < 2) return
    const timer = window.setInterval(() => setActive(current => (current + 1) % count), delay)
    return () => window.clearInterval(timer)
  }, [paused, count, delay, revision])
  const select = next => {
    setActive(current => ((typeof next === 'function' ? next(current) : next) + count) % count)
    // Also restart the full delay when reselecting the current dot.
    setRevision(current => current + 1)
  }
  const change = direction => select(current => current + direction)
  return {
    active, select, change, reduced, stopped, paused,
    toggle: () => setStopped(current => !current),
    status: reduced ? 'Autoplay off · reduced motion' : stopped ? 'Autoplay paused' : focused ? 'Paused · keyboard focus' : hovered ? 'Paused · pointer over carousel' : `Autoplay · ${delay / 1000} seconds`,
    interaction: {
      onPointerEnter: event => { if (event.pointerType !== 'touch') setHovered(true) },
      onPointerLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) },
      onKeyDown: event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          change(event.key === 'ArrowLeft' ? -1 : 1)
        }
      },
    },
  }
}
