import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { BannerProvider } from './context/BannerContext'
import { ContactDrawerProvider } from './context/ContactDrawerContext'
import Navigation from './components/Navigation'
import ContactDrawer from './components/ContactDrawer'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import GridBackground from './components/GridBackground'
import AuraBeams from './components/AuraBeams'
import GlobalGrain from './components/GlobalGrain'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import HomePage from './pages/HomePage'
import ResumePage from './pages/ResumePage'
import DesignSystemPage from './pages/DesignSystemPage'
import {
  FoundationPage,
  ComponentsPage,
  MotionPage,
  PatternsPage,
} from './pages/design-system'
import {
  TeslaChatbot,
  TeslaMegaMenu,
  IndiEV,
  CataliaHealth,
  Notetracks,
} from './pages/projects'
import HeroTestPage from './pages/HeroTestPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ResumePrintPage from './pages/ResumePrintPage'
import ResumePDFPage from './pages/ResumePDFPage'
import ResumePDFMakePage from './pages/ResumePDFMakePage'

function AppContent() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader on first visit this session
    return !sessionStorage.getItem('hasVisited')
  })
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isHeroTest = location.pathname === '/hero-test'
  const isPlayground = location.pathname === '/playground'
  const isResumePrint = location.pathname === '/resume-print'
  const isResumePDF = location.pathname === '/resume-pdf'
  const isDesignSystemSubpage = location.pathname.startsWith('/design-system/')

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasVisited', 'true')
    setIsLoading(false)
  }

  // Standalone pages - no shared layout
  if (isHeroTest) {
    return (
      <Routes>
        <Route path="/hero-test" element={<HeroTestPage />} />
      </Routes>
    )
  }

  if (isPlayground) {
    return (
      <Routes>
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    )
  }

  if (isResumePrint) {
    return (
      <Routes>
        <Route path="/resume-print" element={<ResumePrintPage />} />
      </Routes>
    )
  }

  if (isResumePDF) {
    return (
      <Routes>
        <Route path="/resume-pdf" element={<ResumePDFPage />} />
      </Routes>
    )
  }

  const isResumePDFMake = location.pathname === '/resume-pdfmake'
  if (isResumePDFMake) {
    return (
      <Routes>
        <Route path="/resume-pdfmake" element={<ResumePDFMakePage />} />
      </Routes>
    )
  }

  return (
    <>
      {isHomePage && isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div className="min-h-screen theme-bg relative">
        {!isDesignSystemSubpage && <GridBackground />}
        {!isDesignSystemSubpage && <AuraBeams palette="soulful" />}
        <GlobalGrain />
        <CustomCursor />
        {!(isHomePage && isLoading) && <Navigation />}
        <ContactDrawer />
        <main key={location.pathname} className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/design-system/foundation" element={<FoundationPage />} />
            <Route path="/design-system/components" element={<ComponentsPage />} />
            <Route path="/design-system/motion" element={<MotionPage />} />
            <Route path="/design-system/patterns" element={<PatternsPage />} />
            <Route path="/project/tesla-chatbot" element={<TeslaChatbot />} />
            <Route path="/project/tesla-mega-menu" element={<TeslaMegaMenu />} />
            <Route path="/project/indi-ev" element={<IndiEV />} />
            <Route path="/project/catalia-health" element={<CataliaHealth />} />
            <Route path="/project/notetracks" element={<Notetracks />} />
          </Routes>
        </main>
        {!isDesignSystemSubpage && <Footer />}
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BannerProvider>
        <ContactDrawerProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </ContactDrawerProvider>
      </BannerProvider>
    </ThemeProvider>
  )
}
