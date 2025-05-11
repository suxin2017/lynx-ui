'use client'

import { Inter } from 'next/font/google'

import './globals.css'

import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import { MainLayout, SidebarContent, SidebarProvider } from '@/components/Layout'
import { NetworkRequestProvider } from '@/components/NetRequest/NetworkRequestProvider'
import { initI18next } from '../i18n/config'
import { ThemeProvider } from '../theme/ThemeContext'
import { MSWProvider, ReactQueryProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

// Initialize i18next
initI18next()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Re-initialize i18next on client side
    initI18next()
  }, [])

  const layoutContent = (
    <MainLayout sidebarContent={<SidebarContent />}>
      <NetworkRequestProvider>{children}</NetworkRequestProvider>
    </MainLayout>
  )

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <MSWProvider>
            <AppRouterCacheProvider>
              <ThemeProvider>
                <CssBaseline />
                <SidebarProvider>{layoutContent}</SidebarProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </MSWProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
