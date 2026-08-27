import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getStory } from '../../api/public.js'
import SectionStatus from '../../components/public/SectionStatus.jsx'
import { resolveMediaUrl } from '../../utils/media.js'
import { usePublicResource } from '../../utils/usePublicResource.js'

function StoryDetailPage() { const { slug } = useParams(); const request = useCallback(() => getStory(slug), [slug]); const state = usePublicResource(request); if (state.loading || state.error) return <main className="content-section"><SectionStatus {...state} /></main>; const story = state.data; return <article>{story.featured_image && <img className="detail-hero-image" src={resolveMediaUrl(story.featured_image)} alt="" />}<header className="detail-header"><p className="page-eyebrow">{story.person_name || 'Community story'}</p><h1>{story.title}</h1><p>{story.summary}</p></header><div className="content-section detail-prose">{story.before_story && <section><h2>Before</h2><p>{story.before_story}</p></section>}<section><h2>Transformation</h2><p>{story.transformation_story}</p></section>{story.current_story && <section><h2>Today</h2><p>{story.current_story}</p></section>}{story.video_url && <a href={story.video_url} target="_blank" rel="noreferrer">Watch the related video →</a>}</div></article> }
export default StoryDetailPage
