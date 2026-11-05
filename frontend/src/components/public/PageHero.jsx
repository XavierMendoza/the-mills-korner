import DemoPhoto from './DemoPhoto.jsx'

function PageHero({ eyebrow, title, intro, image, variant = 'wide' }) {
  return <header className={`page-hero${image ? ' page-hero--photo' : ''} page-hero--${variant}`}>
    {image && <DemoPhoto className="page-hero__photo" image={image} priority decorative sizes={variant === 'split' ? '(max-width: 880px) 100vw, 50vw' : '100vw'} />}
    <div className="page-hero__inner">
      {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </div>
  </header>
}
export default PageHero
