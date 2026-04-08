import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
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

// Lazy load heavy pages for better initial load performance
const ResumePage = lazy(() => import('./pages/ResumePage'))
const DesignSystemPage = lazy(() => import('./pages/DesignSystemPage'))
const FoundationPage = lazy(() => import('./pages/design-system/FoundationPage'))
const ComponentsPage = lazy(() => import('./pages/design-system/ComponentsPage'))
const MotionPage = lazy(() => import('./pages/design-system/MotionPage'))
const PatternsPage = lazy(() => import('./pages/design-system/PatternsPage'))
const TeslaChatbot = lazy(() => import('./pages/projects/TeslaChatbot'))
const TeslaMegaMenu = lazy(() => import('./pages/projects/TeslaMegaMenu'))
const IndiEV = lazy(() => import('./pages/projects/IndiEV'))
const CataliaHealth = lazy(() => import('./pages/projects/CataliaHealth'))
const Notetracks = lazy(() => import('./pages/projects/Notetracks'))
const CuboidAnnotator = lazy(() => import('./pages/projects/CuboidAnnotator'))
const CuboidPresentation = lazy(() => import('./pages/projects/CuboidPresentation'))
const HeroTestPage = lazy(() => import('./pages/HeroTestPage'))
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'))
const PrintPage = lazy(() => import('./pages/PrintPage'))
const ResumePDFMakePage = lazy(() => import('./pages/ResumePDFMakePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function AppContent() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loader on first visit this session
    return !sessionStorage.getItem('hasVisited')
  })
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isHeroTest = location.pathname === '/hero-test'
  const isPlayground = location.pathname === '/playground'
  const isPrintPage = location.pathname === '/print'
  const isResumePrint = location.pathname === '/resume-print'
  const isCuboidPresentation = location.pathname === '/project/ai-tool/presentation'
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

  // Combined print page (resume + cover letter)
  if (isPrintPage) {
    return (
      <Routes>
        <Route path="/print" element={<PrintPage />} />
      </Routes>
    )
  }

  // Redirect old /resume-print to /print?tab=resume
  if (isResumePrint) {
    return (
      <Routes>
        <Route path="/resume-print" element={<Navigate to="/print?tab=resume" replace />} />
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

  // Cuboid presentation - fullscreen standalone
  if (isCuboidPresentation) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <CustomCursor />
        <Routes>
          <Route path="/project/ai-tool/presentation" element={<CuboidPresentation />} />
        </Routes>
      </Suspense>
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
          <Suspense fallback={<div className="min-h-screen" />}>
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
              <Route path="/project/ai-tool" element={<CuboidAnnotator />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
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
