'use client'

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const SidebarContent = () => {
  const pathname = usePathname()

  return (
      <List sx={{overflow:"hidden"}}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/netRequest"
            selected={pathname === '/netRequest'}
            sx={(theme) => ({
              borderRadius: 0.75, // 6px (0.75 * 8px)
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
                '& .MuiListItemIcon-root, & .MuiTypography-root': {
                  color: theme.palette.primary.main,
                }
              }
            })}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Network" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/settings"
            selected={pathname === '/settings'}
            sx={(theme) => ({
              borderRadius: 0.75, // 6px (0.75 * 8px)
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
                '& .MuiListItemIcon-root, & .MuiTypography-root': {
                  color: theme.palette.primary.main,
                }
              }
            })}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
  )
}
