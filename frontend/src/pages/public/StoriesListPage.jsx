import { Link } from 'react-router-dom'
import { getStories } from '../../api/public.js'
import PageHero from '../../components/public/PageHero.jsx'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function StoriesListPage() { const state = usePublicResource(getStories); const items = state.data || []; return <><PageHero eyebrow="Community stories" title="Change, in people’s own lives." intro="Stories of connection, growth, and the paths that open when opportunity is present." /><section className="content-section"><SectionStatus {...state} empty={!items.length} emptyMessage="Community stories are being gathered." /><div className="resource-grid">{items.map((story) => <article className="resource-card" key={story.id}>{story.featured_image && <img src={resolveMediaUrl(story.featured_image)} alt="" />}<div>{story.person_name && <p className="card-kicker">{story.person_name}</p>}<h2>{story.title}</h2><p>{story.summary}</p><Link to={`/stories/${story.slug}`}>Read the story →</Link></div></article>)}</div></section></> }
export default StoriesListPage
