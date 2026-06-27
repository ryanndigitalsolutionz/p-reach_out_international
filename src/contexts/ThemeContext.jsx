import { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = {
  white: {
    name: 'White',
    bg: '#ffffff',
    bgSoft: '#F8F9FA',
    bgDark: '#1A1A2E',
    text: '#1A1A2E',
    textMid: '#6B7280',
    border: '#E5E7EB',
    primary: '#C41E3A',
    primaryDark: '#9B1629',
    green: '#2D7A4F',
    greenPale: '#E8F5EE',
    card: '#ffffff',
    navBg: 'rgba(255,255,255,0.97)',
    navText: '#1A1A2E',
  },
  black: {
    name: 'Dark',
    bg: '#0F0F1A',
    bgSoft: '#1A1A2E',
    bgDark: '#060609',
    text: '#F3F4F6',
    textMid: '#9CA3AF',
    border: '#2D2D44',
    primary: '#C41E3A',
    primaryDark: '#9B1629',
    green: '#4CAF7A',
    greenPale: '#1a3528',
    card: '#1A1A2E',
    navBg: 'rgba(15,15,26,0.97)',
    navText: '#F3F4F6',
  },
  blue: {
    name: 'Ocean',
    bg: '#EFF6FF',
    bgSoft: '#DBEAFE',
    bgDark: '#1E3A5F',
    text: '#1E3A5F',
    textMid: '#4B6A8A',
    border: '#BFDBFE',
    primary: '#1D4ED8',
    primaryDark: '#1E40AF',
    green: '#0891B2',
    greenPale: '#CFFAFE',
    card: '#ffffff',
    navBg: 'rgba(239,246,255,0.97)',
    navText: '#1E3A5F',
  },
  pink: {
    name: 'Rose',
    bg: '#FFF1F2',
    bgSoft: '#FFE4E6',
    bgDark: '#4C0519',
    text: '#4C0519',
    textMid: '#9F1239',
    border: '#FECDD3',
    primary: '#E11D48',
    primaryDark: '#BE123C',
    green: '#BE185D',
    greenPale: '#FCE7F3',
    card: '#ffffff',
    navBg: 'rgba(255,241,242,0.97)',
    navText: '#4C0519',
  },
  brown: {
    name: 'Earth',
    bg: '#FDFAF6',
    bgSoft: '#F5F0E8',
    bgDark: '#3B1F0A',
    text: '#3B1F0A',
    textMid: '#78614E',
    border: '#E5D3BF',
    primary: '#92400E',
    primaryDark: '#78350F',
    green: '#6B7C3E',
    greenPale: '#ECFCCB',
    card: '#ffffff',
    navBg: 'rgba(253,250,246,0.97)',
    navText: '#3B1F0A',
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
  const saved = localStorage.getItem('theme')
  return THEMES[saved] ? saved : 'white'
  })
  const theme = THEMES[themeName]

  useEffect(() => {
    localStorage.setItem('theme', themeName)
    const root = document.documentElement
    root.style.setProperty('--bg', theme.bg)
    root.style.setProperty('--bg-soft', theme.bgSoft)
    root.style.setProperty('--bg-dark', theme.bgDark)
    root.style.setProperty('--text', theme.text)
    root.style.setProperty('--text-mid', theme.textMid)
    root.style.setProperty('--border', theme.border)
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--primary-dark', theme.primaryDark)
    root.style.setProperty('--green', theme.green)
    root.style.setProperty('--green-pale', theme.greenPale)
    root.style.setProperty('--card', theme.card)
    root.style.setProperty('--nav-bg', theme.navBg)
    root.style.setProperty('--nav-text', theme.navText)
    document.body.style.background = theme.bg
    document.body.style.color = theme.text
  }, [themeName, theme])

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
