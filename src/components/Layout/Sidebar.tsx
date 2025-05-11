"use client"

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Drawer, IconButton, useTheme } from '@mui/material'
import { useSidebar } from './SidebarContext'

export const DRAWER_WIDTH = 240
const COLLAPSED_WIDTH = 56 // 7 * 8(默认spacing)

export interface SidebarProps {
  children?: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { isOpen, toggle } = useSidebar()
  const theme = useTheme()

  const transitionConfig = {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create(['width'], transitionConfig),
        '& .MuiDrawer-paper': {
          width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          transition: theme.transitions.create(['width'], transitionConfig),
        },
      }}
      open={isOpen}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: 'background.paper',
        }}
      >
        {children}
        <Box
          sx={{
            mt: 'auto',
            borderTop: `1px solid ${theme.palette.divider}`,
            p: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={toggle}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  )
}
