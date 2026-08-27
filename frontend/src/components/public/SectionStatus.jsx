function SectionStatus({ loading, error, empty, emptyMessage = 'Nothing has been published yet.' }) {
  if (loading) return <p className="section-status" role="status">Loading…</p>
  if (error) return <p className="section-status" role="alert">This information is temporarily unavailable.</p>
  if (empty) return <p className="section-status">{emptyMessage}</p>
  return null
}

export default SectionStatus
