'use client'

import { Button, Container, Typography, Box, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTheme } from '../theme/ThemeContext'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@mui/icons-material/Language'
import { useEffect, useState } from 'react'

export default function Home() {
  const { mode, toggleColorMode } = useTheme()
  const { t, i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(newLang)
  }

  // During server-side rendering and first mount, return a placeholder
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}></div>
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            {t("welcome")}
            {t("test")}
          </Typography>
          <Box>
            <IconButton onClick={toggleLanguage} color="inherit" sx={{ mr: 1 }}>
              <LanguageIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {i18n.language.toUpperCase()}
              </Typography>
            </IconButton>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>
        <Button variant="contained" color="primary">
          {t('getStarted')}
        </Button>
      </Box>
    </Container>
  )
}
