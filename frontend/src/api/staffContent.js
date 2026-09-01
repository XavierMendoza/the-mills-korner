const paths = {
  opportunities: '/staff/opportunity-areas/',
  stories: '/staff/stories/',
  partners: '/staff/partners/',
  'impact-metrics': '/staff/impact-metrics/',
  events: '/staff/events/',
}

const pathFor = (type, id) => `${paths[type]}${id ? `${id}/` : ''}`

export const listContent = (request, type) => request({ method: 'get', url: pathFor(type) }).then(({ data }) => data)
export const retrieveContent = (request, type, id) => request({ method: 'get', url: pathFor(type, id) }).then(({ data }) => data)
export const createContent = (request, type, data) => request({ method: 'post', url: pathFor(type), data }).then(({ data: result }) => result)
export const updateContent = (request, type, id, data) => request({ method: 'patch', url: pathFor(type, id), data }).then(({ data: result }) => result)
export const deleteContent = (request, type, id) => request({ method: 'delete', url: pathFor(type, id) })
