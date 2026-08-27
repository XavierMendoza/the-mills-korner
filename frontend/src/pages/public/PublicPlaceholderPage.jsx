function PublicPlaceholderPage({ title, description }) {
  return (
    <section className="page-section" aria-labelledby="page-title">
      <div className="content-container">
        <p className="page-eyebrow">The Mills Korner</p>
        <h1 id="page-title">{title}</h1>
        <p className="page-intro">{description}</p>
      </div>
    </section>
  )
}

export default PublicPlaceholderPage
