import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PaletteMode, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { createAppTheme } from './theme'

type ThemeContextType = {
  mode: PaletteMode
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  useEffect(() => {
    const storedMode = localStorage.getItem('theme-mode') as PaletteMode
    if (storedMode) {
      setMode(storedMode)
    }
  }, [])

  const themeContext = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        setMode(newMode)
        localStorage.setItem('theme-mode', newMode)
      },
    }),
    [mode]
  )

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={themeContext}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)