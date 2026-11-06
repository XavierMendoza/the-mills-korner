export default function CarouselControls({ carousel, labels, name }) {
  return <div className="tmk-carousel-tools">
    <div className="tmk-carousel-buttons" role="group" aria-label={`${name} controls`}>
      <button type="button" aria-label={`Previous ${name}`} onClick={() => carousel.change(-1)}>←</button>
      {labels.map((label, index) => <button type="button" className="tmk-dot" key={label} aria-label={`Show ${name} ${index + 1}: ${label}`} aria-pressed={carousel.active === index} onClick={() => carousel.select(index)}><span /></button>)}
      <button type="button" aria-label={`Next ${name}`} onClick={() => carousel.change(1)}>→</button>
      <button type="button" className="tmk-playback" disabled={carousel.reduced} aria-label={`${carousel.stopped ? 'Enable' : 'Pause'} ${name} autoplay`} onClick={carousel.toggle}>{carousel.stopped ? 'Play' : 'Pause'}</button>
    </div>
    <p className="tmk-playback-status">{carousel.status}</p>
  </div>
}
