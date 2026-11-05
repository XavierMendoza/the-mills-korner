import { Link } from 'react-router-dom'
import { stories as items } from '../../data/stories.js'
import PageHero from '../../components/public/PageHero.jsx'
import EditorialEmptyState from '../../components/public/EditorialEmptyState.jsx'

function StoriesListPage() { return <><PageHero image="wellness" variant="wide" eyebrow="Transformation stories" title="Before. Transformation. Where they are now." intro="TMK’s story collection will focus on a small number of thoughtfully documented transformations, supported by professional photography or video and shared with permission." /><section className="content-section">{!items.length && <EditorialEmptyState image="mentorship" eyebrow="Stories of growth" title="Before. Transformation. Where they are now.">Stories of transformation will be shared here with participant permission as they become available.</EditorialEmptyState>}<div className="resource-grid">{items.map((story) => <article className="resource-card" key={story.id}>{story.featured_image && <img loading="lazy" decoding="async" src={story.featured_image} alt="" />}<div>{story.person_name && <p className="card-kicker">{story.person_name}</p>}<h2>{story.title}</h2><p>{story.summary}</p><Link to={`/stories/${story.slug}`}>Read the story →</Link></div></article>)}</div></section></> }
export default StoriesListPage
