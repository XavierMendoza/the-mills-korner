const photos = {
  service: [1440, 1800, 'TMK community service group beside food and supplies'],
  supplies: [1440, 1800, 'Community distribution table with food and supplies'],
  huddle: [1448, 1086, 'A coach addresses a youth football huddle'],
  champions: [1448, 1086, 'Youth football team and adults gathered around a trophy'],
  kevin: [1586, 2000, 'Kevin Mills, founder of The Mills Korner'],
}
export default function TmkPhoto({ name, priority = false, decorative = false, sizes = '(max-width: 768px) 100vw, 50vw', className = '' }) {
  const [width, height, alt] = photos[name]
  return <img className={className} src={`/images/tmk/brand/${name}-1280.webp`} srcSet={`/images/tmk/brand/${name}-640.webp 640w, /images/tmk/brand/${name}-1280.webp 1280w`} sizes={sizes} width={width} height={height} alt={decorative ? '' : alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
}
