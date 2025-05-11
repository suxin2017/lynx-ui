import { createTheme, PaletteMode, ThemeOptions } from '@mui/material'

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          // primary: {
          // main: '#1976d2',
          // },
          // secondary: {
          //   main: '#9c27b0',
          // },
          // background: {
          //   default: '#fff',
          //   paper: '#f5f5f5',
          // },
        }
      : {
          // Dark mode palette
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#ce93d8',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  shape: {
    borderRadius: 6,
  },
  spacing: 4,
  components: {},
})

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode))
}
