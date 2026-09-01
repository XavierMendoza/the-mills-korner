const requestData = (request, config) => request(config).then(({ data }) => data)

export const listInquiries = (request) => requestData(request, { method: 'get', url: '/staff/inquiries/' })
export const retrieveInquiry = (request, id) => requestData(request, { method: 'get', url: `/staff/inquiries/${id}/` })
export const updateInquiry = (request, id, data) => requestData(request, { method: 'patch', url: `/staff/inquiries/${id}/`, data })
export const listSubscribers = (request) => requestData(request, { method: 'get', url: '/staff/newsletter-subscribers/' })
export const retrieveSubscriber = (request, id) => requestData(request, { method: 'get', url: `/staff/newsletter-subscribers/${id}/` })
export const updateSubscriber = (request, id, data) => requestData(request, { method: 'patch', url: `/staff/newsletter-subscribers/${id}/`, data })
