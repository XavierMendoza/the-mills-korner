const photos = {
  service: [1440, 1800, 'TMK community service group beside food and supplies'],
  supplies: [1440, 1800, 'Community distribution table with food and supplies'],
  huddle: [1448, 1086, 'Kevin Mills addresses Bulldogs football players in red-and-white uniforms'],
  champions: [1448, 1086, 'Youth football team and adults gathered around a trophy'],
  kevin: [1586, 2000, 'Kevin Mills, founder of The Mills Korner'],
  'formal-light-blue': [245, 640, 'Person in a light-blue suit', 'tmk-formal-light-blue-web.webp'],
  'football-number-39': [481, 598, 'Football player wearing number 39 on the field', 'tmk-football-number-39-web.webp'],
  'field-action-turn': [481, 618, 'Athlete changing direction on a grass field', 'tmk-field-action-turn-web.webp'],
  'football-team-group': [640, 340, 'Football team assembled on a grass field', 'tmk-football-team-group-web.webp'],
  'field-action-drill': [404, 640, 'Athlete running a drill on a grass field', 'tmk-field-action-drill-web.webp'],
  'football-field-guidance': [415, 640, 'A football being handed to a player during a field session', 'tmk-football-field-guidance-web.webp'],
  'football-field-group': [520, 480, 'Three people standing together on a football field', 'tmk-football-field-group-web.webp'],
  'community-evening-group': [640, 429, 'Four people posing together at an evening gathering', 'tmk-community-evening-group-web.webp'],
  'football-night-huddle': [640, 474, 'Football players and a coach gathered under stadium lights', 'tmk-football-night-huddle-web.webp'],
  'bench-one': [1500, 2000, 'Three young people sitting together on an outdoor bench', 'tmk-youth-group-bench-1-web.webp'],
  'bench-two': [1500, 2000, 'Three young people sitting together on an outdoor bench', 'tmk-youth-group-bench-2-web.webp'],
  'youth-pair': [1500, 2000, 'Two young people standing together outdoors', 'tmk-youth-pair-outdoors-web.webp'],
  'community-event': [2000, 1333, 'Two people together at a community gathering', 'tmk-community-event-portrait-web.webp'],
  'evening-gathering': [1500, 2000, 'Three people posing together at an evening gathering', 'tmk-evening-gathering-web.webp'],
  'event-booth': [1892, 2000, 'The Mills Korner booth with a branded table, banner, and canopy', 'tmk-event-booth-web.webp'],
}
export default function TmkPhoto({ name, priority = false, decorative = false, sizes = '(max-width: 768px) 100vw, 50vw', className = '' }) {
  const [width, height, alt, file] = photos[name]
  const src = file ? `/images/tmk/${file}` : `/images/tmk/brand/${name}-1280.webp`
  const srcSet = file ? undefined : `/images/tmk/brand/${name}-640.webp 640w, /images/tmk/brand/${name}-1280.webp 1280w`
  return (
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={width}
      height={height}
      alt={decorative ? '' : alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
}
