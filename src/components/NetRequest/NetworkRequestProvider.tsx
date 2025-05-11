import { ReactNode, useEffect } from 'react'

import { useGetCachedRequests } from '@/api/generated/net-request/net-request'
import type {
  MessageEventStoreValue,
  ResponseDataWrapperRecordRequests,
} from '@/api/generated/utoipaAxum.schemas'
import { useInterval } from '@/hooks/useInterval'
import { useNetworkRequestStore } from '@/store/networkRequestStore'

interface NetworkRequestProviderProps {
  children: ReactNode
}

function mapToNetworkRequest(event: MessageEventStoreValue) {
  return {
    id: event.traceId,
    method: event.request?.method || 'UNKNOWN',
    url: event.request?.url || '',
    path: event?.request?.url,
    status: event.response?.status || 'UNKNOWN',
    duration:
      event.timings?.requestEnd && event.timings?.requestStart
        ? event.timings.requestEnd - event.timings.requestStart
        : 'UNKNOWN',
    size: event.response?.body?.length || 0,
    contentType: event.response?.headers['Content-Type'] || 'UNKNOWN',
    protocol: event.request?.version || 'UNKNOWN',
    timestamp: Date.now(),
    isWebSocket: event.request?.headers['Upgrade'] === 'websocket',
  }
}

export function NetworkRequestProvider({ children }: NetworkRequestProviderProps) {
  const { pushRequests, replaceRequests } = useNetworkRequestStore()
  const { mutate: fetchRequests } = useGetCachedRequests({
    mutation: {
      onSuccess: (data: ResponseDataWrapperRecordRequests) => {
        if (data && data.data) {
          if (data.data.newRequests) {
            pushRequests(data.data.newRequests)
          }
          if (data.data.patchRequests) {
            replaceRequests(data.data.patchRequests)
          }
        }
      },
      onError: (error) => {
        console.error('Error fetching network requests:', error)
      },
    },
  })

  useEffect(() => {
    fetchRequests({ data: {} }) // Initial fetch
  }, [fetchRequests])

  useInterval(() => fetchRequests({ data: {} }), 5000) // Poll every 5 seconds

  return <>{children}</>
}
