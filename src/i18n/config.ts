import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export const initI18next = async () => {
  await i18next
    .use(initReactI18next)
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      lng: 'en', // default language
      fallbackLng: 'en',
      defaultNS: 'common',
      ns: ['common'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['localStorage', 'navigator'],
      },
    })

  return i18next
}
