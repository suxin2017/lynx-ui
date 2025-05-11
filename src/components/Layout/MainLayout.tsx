import { Box } from '@mui/material'

import { DRAWER_WIDTH, Sidebar } from './Sidebar'

export interface MainLayoutProps {
  children?: React.ReactNode
  sidebarContent?: React.ReactNode
}

export const MainLayout = ({ children, sidebarContent }: MainLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '768px',
        minWidth: '1024px',
        maxWidth: '1920px',
        margin: '0 auto',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar>{sidebarContent}</Sidebar>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 3,
          minHeight: '768px',
          height: '100vh',
          overflow: 'auto',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
