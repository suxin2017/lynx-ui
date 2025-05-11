'use client'

import { Box, Stack as MuiStack, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

// Create a styled version of Stack to fix any incompatibility issues
const Stack = styled(MuiStack)``

const TestComponent = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Paper>Test</Paper>
    </Stack>
  )
}

export default TestComponent
