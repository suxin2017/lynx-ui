'use client'

import { Box, Paper, Stack } from '@mui/material'

import { useGetCaptureStatus } from '@/api/generated/net-request/net-request'
import type { MessageEventStoreValue } from '@/api/generated/utoipaAxum.schemas'
import { NetRequestToolbar } from '@/components/NetRequest/NetRequestToolbar'
import { VirtualizedNetRequestTable } from '@/components/NetRequest/VirtualizedNetRequestTable'
import { useNetworkRequestStore } from '@/store/networkRequestStore'

export default function NetRequestPage() {
  const { pushRequests: setRequests } = useNetworkRequestStore()

  const handleStartCapture = () => {
    console.log('Start capture')
  }

  const handleStopCapture = () => {
    console.log('Stop capture')
  }

  const handleImport = () => {
    console.log('Import')
  }

  const handleExport = () => {
    console.log('Export')
  }

  const handleClear = () => {
    setRequests([])
  }

  const handleFilter = () => {
    console.log('Filter')
  }

  const handleColumnConfig = () => {
    console.log('Column config')
  }

  const handleRequestClick = (request: MessageEventStoreValue) => {
    console.log('Request clicked:', request)
  }

  return (
    <Box sx={{ height: '100%', p: 2 }}>
      <Stack direction="column" spacing={2} sx={{ height: '100%' }}>
        <Paper elevation={1}>
          <NetRequestToolbar
            onStartCapture={handleStartCapture}
            onStopCapture={handleStopCapture}
            onImport={handleImport}
            onExport={handleExport}
            onClear={handleClear}
            onFilter={handleFilter}
            onColumnConfig={handleColumnConfig}
          />
        </Paper>
        <VirtualizedNetRequestTable onRequestClick={handleRequestClick} />
      </Stack>
    </Box>
  )
}
