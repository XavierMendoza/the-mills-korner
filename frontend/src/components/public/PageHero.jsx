function PageHero({ eyebrow, title, intro }) {
  return (
    <header className="page-hero">
      <div className="page-hero__inner">
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  )
}

export default PageHero
