export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const writableRoles = new Set(['SUPER_ADMIN', 'CONTENT_MANAGER'])

export const contentConfigs = {
  opportunities: { label: 'Opportunity Areas', singular: 'Opportunity Area', description: 'Manage the paths where TMK creates access and connection.', titleField: 'title', imageField: 'featured_image', fields: [
    ['title', 'Title', 'text', true], ['slug', 'Slug', 'text', true], ['short_description', 'Short description', 'text', true], ['description', 'Description', 'textarea', true], ['featured_image', 'Featured image', 'file'], ['display_order', 'Display order', 'number'], ['is_published', 'Published', 'checkbox'],
  ] },
  stories: { label: 'Stories', singular: 'Story', description: 'Manage community stories and transformation narratives.', titleField: 'title', imageField: 'featured_image', fields: [
    ['title', 'Title', 'text', true], ['slug', 'Slug', 'text', true], ['person_name', 'Person name', 'text'], ['summary', 'Summary', 'textarea', true], ['before_story', 'Before story', 'textarea'], ['transformation_story', 'Transformation story', 'textarea', true], ['current_story', 'Current story', 'textarea'], ['featured_image', 'Featured image', 'file'], ['video_url', 'Video URL', 'url'], ['is_featured', 'Featured', 'checkbox'], ['is_published', 'Published', 'checkbox'], ['published_at', 'Published at', 'datetime-local'],
  ] },
  partners: { label: 'Partners', singular: 'Partner', description: 'Manage organizations working alongside TMK.', titleField: 'name', imageField: 'logo', fields: [
    ['name', 'Name', 'text', true], ['partner_type', 'Partner type', 'select', true, [['SCHOOL', 'School'], ['FOUNDATION', 'Foundation'], ['BUSINESS', 'Business'], ['CITY', 'City'], ['FAITH', 'Faith Community'], ['OTHER', 'Other']]], ['logo', 'Logo', 'file'], ['website_url', 'Website URL', 'url'], ['description', 'Description', 'textarea'], ['display_order', 'Display order', 'number'], ['is_featured', 'Featured', 'checkbox'], ['is_published', 'Published', 'checkbox'],
  ] },
  'impact-metrics': { label: 'Impact Metrics', singular: 'Impact Metric', description: 'Manage the published measures of community progress.', titleField: 'name', fields: [
    ['name', 'Name', 'text', true], ['value', 'Value', 'number', true], ['prefix', 'Prefix', 'text'], ['suffix', 'Suffix', 'text'], ['description', 'Description', 'textarea'], ['display_order', 'Display order', 'number'], ['is_featured', 'Featured', 'checkbox'], ['is_published', 'Published', 'checkbox'],
  ] },
  events: { label: 'Events', singular: 'Event', description: 'Manage upcoming public gatherings and registrations.', titleField: 'title', imageField: 'featured_image', fields: [
    ['title', 'Title', 'text', true], ['slug', 'Slug', 'text', true], ['summary', 'Summary', 'textarea', true], ['description', 'Description', 'textarea', true], ['location_name', 'Location', 'text'], ['address', 'Address', 'text'], ['start_datetime', 'Starts', 'datetime-local', true], ['end_datetime', 'Ends', 'datetime-local', true], ['featured_image', 'Featured image', 'file'], ['registration_url', 'Registration URL', 'url'], ['is_featured', 'Featured', 'checkbox'], ['is_published', 'Published', 'checkbox'],
  ] },
}
