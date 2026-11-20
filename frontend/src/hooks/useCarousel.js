import { useEffect, useState } from 'react'

export default function useCarousel(count, delay) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [reduced, setReduced] = useState(true)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReduced(media.matches)
      if (media.matches) {
        setActive(0)
        setFocused(false)
      }
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const paused = reduced || stopped || hovered || focused
  useEffect(() => {
    if (paused || count < 2) return
    const timer = window.setInterval(() => setActive(current => (current + 1) % count), delay)
    return () => window.clearInterval(timer)
  }, [paused, count, delay])

  return {
    active,
    reduced,
    stopped,
    toggle: () => setStopped(current => !current),
    interaction: {
      onPointerEnter: event => { if (event.pointerType !== 'touch') setHovered(true) },
      onPointerLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      },
    },
  }
}
