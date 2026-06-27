import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Library from './components/Library'
import Conditions from './components/Conditions'
import Programs from './components/Programs'
import Stories from './components/Stories'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CurvedDivider, { WaveDivider, BlobDivider } from './components/CurvedDivider'
import { useReveal, useTiltCards, useFloatingShapes } from './hooks/useAnimations'
import AuthPage from './pages/AuthPage'
import AdminAuth from './pages/AdminAuth'
import AdminDashboard from './pages/AdminDashboard'
import DonatePage from './pages/DonatePage'
import { useTheme } from './contexts/ThemeContext'

function HomePage() {
  const { theme } = useTheme()
  useReveal()
  useTiltCards()
  useFloatingShapes()

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.reveal:not(.revealed)').forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Hero />
      <CurvedDivider fromColor={theme.bg} toColor={theme.bgSoft} />
      <About />
      <BlobDivider fromColor={theme.bgSoft} toColor={theme.bg} />
      <Services />
      <WaveDivider fromColor={theme.bg} toColor={theme.bgSoft} />
      <Library />
      <CurvedDivider fromColor={theme.bgSoft} toColor={theme.bgDark} flip />
      <Conditions />
      <CurvedDivider fromColor={theme.bgDark} toColor={theme.bg} />
      <Programs />
      <BlobDivider fromColor={theme.bg} toColor={theme.bgDark} />
      <Stories />
      <CurvedDivider fromColor={theme.bgDark} toColor={theme.bg} />
      <Team />
      <WaveDivider fromColor={theme.bg} toColor={theme.bgSoft} />
      <Contact />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/admin-login" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </div>
  )
}
