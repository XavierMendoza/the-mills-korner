import DemoPhoto from './DemoPhoto.jsx'

function EditorialEmptyState({ image, eyebrow, title, children }) {
  return <section className="editorial-empty">
    <DemoPhoto image={image} sizes="(max-width: 880px) 100vw, 50vw" />
    <div className="editorial-empty__copy"><p className="page-eyebrow">{eyebrow}</p><h2>{title}</h2><p>{children}</p><span className="editorial-empty__rule" aria-hidden="true" /></div>
  </section>
}
export default EditorialEmptyState
