'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../theme/ThemeContext'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import { initI18next } from '../i18n/config'

const inter = Inter({ subsets: ['latin'] })

// Initialize i18next
initI18next()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Re-initialize i18next on client side
    initI18next()
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
