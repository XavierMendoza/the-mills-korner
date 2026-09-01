import { Link } from 'react-router-dom'
import { getStories } from '../../api/public.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function StoriesListPage() { const state = usePublicResource(getStories); const items = state.data || []; return <><PageHero eyebrow="Transformation stories" title="Before. Transformation. Where they are now." intro="TMK’s story collection will focus on a small number of thoughtfully documented transformations, supported by professional photography or video and shared with permission." /><section className="content-section"><SectionStatus {...state} empty={!items.length} emptyMessage="Stories of transformation will be shared here soon." /><div className="resource-grid">{items.map((story) => <article className="resource-card" key={story.id}>{story.featured_image && <img src={resolveMediaUrl(story.featured_image)} alt="" />}<div>{story.person_name && <p className="card-kicker">{story.person_name}</p>}<h2>{story.title}</h2><p>{story.summary}</p><Link to={`/stories/${story.slug}`}>Read the story →</Link></div></article>)}</div></section></> }
export default StoriesListPage
