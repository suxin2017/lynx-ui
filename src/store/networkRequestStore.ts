import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { MessageEventStoreValue } from '@/api/generated/utoipaAxum.schemas'

interface NetworkRequestStore {
  requests: MessageEventStoreValue[]
  pushRequests: (requests: MessageEventStoreValue[]) => void
  replaceRequests: (requests: MessageEventStoreValue[]) => void
}

export const useNetworkRequestStore = create(
  immer<NetworkRequestStore>((set) => ({
    requests: [],

    pushRequests: (requests: MessageEventStoreValue[]) => {
      set((state) => {
        state.requests.push(...requests)
      })
    },

    replaceRequests: (requests: MessageEventStoreValue[]) => {
      set((state) => {
        state.requests = state.requests.map((req) => {
          const replacement = requests.find((r) => r.traceId === req.traceId)
          return replacement ? replacement : req
        })
      })
    },
  }))
)
