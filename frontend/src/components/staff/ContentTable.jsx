import { Link } from 'react-router-dom'

function ContentTable({ config, items, type, canWrite, onDelete }) {
  return <div className="staff-table-wrap"><table className="staff-table"><thead><tr><th>{config.singular}</th><th>Status</th>{canWrite && <th>Actions</th>}</tr></thead><tbody>{items.map((item) => <tr key={item.id}><td>{item[config.titleField]}</td><td><span className={item.is_published ? 'status status--live' : 'status'}>{item.is_published ? 'Published' : 'Draft'}</span></td>{canWrite && <td><Link to={`/staff/content/${type}/${item.id}/edit`}>Edit</Link> <button type="button" onClick={() => onDelete(item)}>Delete</button></td>}</tr>)}</tbody></table></div>
}
export default ContentTable
