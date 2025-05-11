import React, { memo, useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Fab,
  Paper,
  styled,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Zoom,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ListChildComponentProps, VariableSizeList } from 'react-window'

import type {
  MessageEventStoreValue,
  MessageEventTimings,
} from '@/api/generated/utoipaAxum.schemas'
import { useNetworkRequestStore } from '@/store/networkRequestStore'

interface VirtualizedNetRequestTableProps {
  onRequestClick?: (request: MessageEventStoreValue) => void
}

interface Column {
  id: string
  label: string
  width?: string
  minWidth?: string
  flex?: number
  format?: (value: any) => string
}

const columns: Column[] = [
  { id: 'method', label: 'Method', width: '100px', minWidth: '100px' },
  { id: 'url', label: 'URL', flex: 1, minWidth: '200px' },
  {
    id: 'status',
    label: 'Status',
    width: '80px',
    minWidth: '80px',
    format: (value: any) => value || 'N/A',
  },
  {
    id: 'timings',
    label: 'Duration',
    width: '100px',
    minWidth: '100px',
    format: (value: MessageEventTimings) =>
      `${(value?.requestEnd || 0) - (value?.requestStart || 0)}ms`,
  },
  {
    id: 'response.body',
    label: 'Size',
    width: '80px',
    minWidth: '80px',
    format: (value: any) => `${value?.length || 0}B`,
  },
  { id: 'response.headers.Content-Type', label: 'Content-Type', width: '150px', minWidth: '150px' },
  { id: 'request.version', label: 'Protocol', width: '100px', minWidth: '100px' },
]

// 使用styled API创建自定义的MUI组件
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '48px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const StyledTableCell = styled(TableCell)<{ flex?: number; width?: string; minWidth?: string }>(
  ({ theme, flex, width, minWidth }) => ({
    flex: flex ? flex : 'none',
    width,
    minWidth,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderBottom: 'none',
  })
)

// 表头单元格样式
const StyledHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}))

const TableRowComponent = memo(
  ({
    request,
    onRequestClick,
    style,
  }: {
    request: MessageEventStoreValue
    onRequestClick?: (request: MessageEventStoreValue) => void
    style?: React.CSSProperties
  }) => (
    <StyledTableRow
      onClick={() => onRequestClick?.(request)}
      style={{ ...style, width: '100%' }} // 强制内容行宽度100%
      sx={{
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
      }}
    >
      {columns.map((column) => {
        const value =
          column.id === 'timings'
            ? request.timings
            : column.id === 'response.body'
              ? request.response?.body
              : column.id === 'response.headers.Content-Type'
                ? request.response?.headers['Content-Type']
                : column.id === 'request.version'
                  ? request.request?.version
                  : column.id === 'method'
                    ? request.request?.method
                    : column.id === 'url'
                      ? request.request?.url
                      : column.id === 'status'
                        ? request.response?.status
                        : undefined

        // 确保显示的值是字符串
        const displayValue = column.format
          ? column.format(value)
          : (value as any)?.toString?.() || ''

        return (
          <StyledTableCell
            key={column.id}
            flex={column.flex}
            width={column.width}
            minWidth={column.minWidth}
          >
            {displayValue}
          </StyledTableCell>
        )
      })}
    </StyledTableRow>
  )
)

TableRowComponent.displayName = 'TableRowComponent'

export const VirtualizedNetRequestTable: React.FC<VirtualizedNetRequestTableProps> = ({
  onRequestClick,
}) => {
  const theme = useTheme()
  const { requests } = useNetworkRequestStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<VariableSizeList>(null)
  const [containerHeight, setContainerHeight] = useState(400)
  const [, forceRender] = useState<{}>({})
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showScrollBottom, setShowScrollBottom] = useState(false)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  // 检测滚动条宽度
  useEffect(() => {
    // 动态测量滚动条宽度
    const measureScrollbar = () => {
      const scrollDiv = document.createElement('div')
      scrollDiv.style.width = '100px'
      scrollDiv.style.height = '100px'
      scrollDiv.style.overflow = 'scroll'
      scrollDiv.style.position = 'absolute'
      scrollDiv.style.top = '-9999px'
      document.body.appendChild(scrollDiv)
      const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
      setScrollbarWidth(width)
    }
    measureScrollbar()
  }, [])

  // 计算按钮显示逻辑
  const updateScrollButtonState = (
    scrollOffset: number,
    containerHeightValue: number = containerHeight
  ) => {
    setShowScrollTop(scrollOffset > 200)
    const maxScrollOffset = requests.length * 48 - containerHeightValue
    const isNearBottom = maxScrollOffset - scrollOffset < 200
    setShowScrollBottom(!isNearBottom && requests.length > 0)
  }

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const headerHeight = 48
        const newHeight = containerRef.current.clientHeight - headerHeight
        setContainerHeight(newHeight)
        forceRender({})
        // 重新判断按钮显示
        let scrollOffset = 0
        if (listRef.current) {
          // @ts-ignore
          scrollOffset = listRef.current.state?.scrollOffset || 0
        }
        updateScrollButtonState(scrollOffset, newHeight)
      }
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', updateDimensions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDimensions)
    }
    // eslint-disable-next-line
  }, [requests.length])

  // 滚动时只根据 scrollOffset 判断按钮显示
  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    updateScrollButtonState(scrollOffset)
  }

  const handleScrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo(0)
      updateScrollButtonState(0)
    }
  }

  const handleScrollToBottom = () => {
    if (listRef.current && requests.length > 0) {
      listRef.current.scrollToItem(requests.length - 1, 'end')
      // 计算最大 scrollOffset
      const maxScrollOffset = requests.length * 48 - containerHeight
      updateScrollButtonState(maxScrollOffset)
    }
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    const request = requests[index]
    return (
      <TableRowComponent
        key={request.traceId}
        request={request}
        onRequestClick={onRequestClick}
        style={style}
      />
    )
  }

  return (
    <TableContainer
      component={Paper}
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%', // Fill the parent container
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <StyledTableRow style={scrollbarWidth > 0 ? { paddingRight: scrollbarWidth } : undefined}>
          {columns.map((column) => (
            <StyledHeaderCell
              key={column.id}
              flex={column.flex}
              width={column.width}
              minWidth={column.minWidth}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {column.label}
              </Typography>
            </StyledHeaderCell>
          ))}
        </StyledTableRow>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {requests.length > 0 && (
          <VariableSizeList
            ref={listRef}
            height={containerHeight}
            itemCount={requests.length}
            itemSize={() => 48}
            width="100%"
            onScroll={handleScroll}
          >
            {Row}
          </VariableSizeList>
        )}

        {/* Scroll to Top Button */}
        <Zoom in={showScrollTop}>
          <Fab
            size="small"
            color="primary"
            aria-label="scroll to top"
            onClick={handleScrollToTop}
            sx={{
              position: 'absolute',
              bottom: theme.spacing(14),
              right: theme.spacing(2),
              opacity: 0.8,
              '&:hover': { opacity: 1 },
              zIndex: 2,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>

        {/* Scroll to Bottom Button */}
        <Zoom in={showScrollBottom}>
          <Fab
            size="small"
            color="primary"
            aria-label="scroll to bottom"
            onClick={handleScrollToBottom}
            sx={{
              position: 'absolute',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
              opacity: 0.8,
              '&:hover': { opacity: 1 },
              zIndex: 2,
            }}
          >
            <KeyboardArrowDownIcon />
          </Fab>
        </Zoom>
      </Box>
    </TableContainer>
  )
}
