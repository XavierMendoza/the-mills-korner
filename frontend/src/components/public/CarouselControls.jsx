export default function CarouselControls({ carousel, name }) {
  if (carousel.reduced) return null

  const action = carousel.stopped ? 'Play' : 'Pause'

  return (
    <button
      type="button"
      className="tmk-playback"
      aria-label={`${action} ${name} rotation`}
      onClick={carousel.toggle}
    >
      {action}
    </button>
  )
}
