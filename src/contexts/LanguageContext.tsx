// src/contexts/LanguageContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type Language, type Translations, translations } from '../data/translations'

interface LanguageContextType {
  lang: Language
  t: Translations
  toggle: () => void
}

const HTML_LANG: Record<Language, string> = { pt: 'pt-BR', en: 'en' }

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('pt')
  const toggle = () => setLang(prev => (prev === 'pt' ? 'en' : 'pt'))

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
