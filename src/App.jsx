import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
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

function AppContent() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader on first visit this session
    return !sessionStorage.getItem('hasVisited')
  })
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isHeroTest = location.pathname === '/hero-test'
  const isPlayground = location.pathname === '/playground'
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

  return (
    <>
      {isHomePage && isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div className="min-h-screen theme-bg relative">
        <GridBackground />
        {!isDesignSystemSubpage && <AuraBeams palette="soulful" />}
        <GlobalGrain />
        <CustomCursor />
        <Navigation />
        <main>
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
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  )
}
