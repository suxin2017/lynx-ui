'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '../theme/ThemeContext'

export function MSWProvider({ children }: PropsWithChildren) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    async function enableMocking() {
      if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
        setIsInitialized(true)
        return
      }
      const { worker } = await import('../mocks/browser')
      await worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        onUnhandledRequest: 'bypass',
      })
      setIsInitialized(true)
    }

    enableMocking()
  }, [])

  if (!isInitialized) {
    return null
  }

  return <>{children}</>
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
