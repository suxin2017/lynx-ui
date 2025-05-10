import { setupServer } from 'msw/node'

import { handlers } from './handlers'

export const server = setupServer(...handlers)

// 只保留关键的 MSW 事件日志
server.events.on('request:unhandled', ({ request }) => {
  console.warn('[MSW Node] Unhandled request:', {
    method: request.method,
    url: request.url,
  })
})

server.events.on('response:mocked', ({ response, request }) => {
  console.log('[MSW Node] Mocked:', request.method, request.url, response.status)
})
