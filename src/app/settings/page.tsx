'use client'

import { Box, Typography } from '@mui/material'
import { MainLayout, SidebarContent } from '@/components/Layout'

export default function SettingsPage() {
  return (
    <MainLayout sidebarContent={<SidebarContent />}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1">
          Settings
        </Typography>
      </Box>
    </MainLayout>
  )
}
