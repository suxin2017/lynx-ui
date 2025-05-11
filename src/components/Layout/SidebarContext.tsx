'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // 从本地存储中获取状态
    const stored = localStorage.getItem('sidebarOpen')
    if (stored !== null) {
      setIsOpen(stored === 'true')
    }
  }, [])

  const toggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    // 保存到本地存储
    localStorage.setItem('sidebarOpen', String(newState))
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
