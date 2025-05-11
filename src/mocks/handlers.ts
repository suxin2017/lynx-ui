import { http, HttpResponse } from 'msw'

import { getDefaultMock } from '@/api/generated/default/default.msw'
import { getNetRequestMock } from '@/api/generated/net-request/net-request.msw'

// Handle CORS preflight requests
const corsHandler = http.options('*', ({ request }) => {
  console.log('[MSW] Handling OPTIONS request:', request.url)
  return new HttpResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  })
})

export const handlers = [corsHandler, ...getNetRequestMock(), ...getDefaultMock()]
