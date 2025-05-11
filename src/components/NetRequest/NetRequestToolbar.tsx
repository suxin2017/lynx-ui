'use client'

import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FilterListIcon from '@mui/icons-material/FilterList'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import { Box, Button, IconButton, Tooltip } from '@mui/material'

import { useGetCaptureStatus, useToggleCapture } from '@/api/generated/net-request/net-request'

export interface NetRequestToolbarProps {
  onStartCapture: () => void
  onStopCapture: () => void
  onImport: () => void
  onExport: () => void
  onClear: () => void
  onFilter: () => void
  onColumnConfig: () => void
}

export const NetRequestToolbar = ({
  onStartCapture,
  onStopCapture,
  onImport,
  onExport,
  onClear,
  onFilter,
  onColumnConfig,
}: NetRequestToolbarProps) => {
  const [isCapturing, setIsCapturing] = useState(false)
  const toggleCaptureMutation = useToggleCapture()
  const captureStatus = useGetCaptureStatus()

  const handleCaptureToggle = async () => {
    try {
      await toggleCaptureMutation.mutateAsync()
      setIsCapturing(!isCapturing)
      if (isCapturing) {
        onStopCapture()
      } else {
        onStartCapture()
      }
    } catch (error) {
      console.error('Failed to toggle capture:', error)
    }
  }

  return (
    <Box sx={{ p: 2, display: 'flex', gap: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Tooltip title={isCapturing ? '停止捕获' : '开始捕获'}>
        <IconButton color={isCapturing ? 'error' : 'primary'} onClick={handleCaptureToggle}>
          {isCapturing ? <StopIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="导入">
        <IconButton onClick={onImport}>
          <FileUploadIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="导出">
        <IconButton onClick={onExport}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="清除">
        <IconButton onClick={onClear}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ flex: 1 }} />

      <Tooltip title="筛选">
        <IconButton onClick={onFilter}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="列配置">
        <IconButton onClick={onColumnConfig}>
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
