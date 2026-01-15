import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const BannerContext = createContext({
  isLightBanner: false,
  isDarkBanner: false,
  isInBannerZone: false,
  setLightBanner: () => {},
  setDarkBanner: () => {},
  setBannerHeight: () => {},
})

export function BannerProvider({ children }) {
  const [isLightBanner, setIsLightBanner] = useState(false)
  const [isDarkBanner, setIsDarkBanner] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [isInBannerZone, setIsInBannerZone] = useState(true)

  // Track scroll position to determine if we're in the banner zone
  useEffect(() => {
    if (bannerHeight === 0) {
      setIsInBannerZone(false)
      return
    }

    const handleScroll = () => {
      // Consider "in banner zone" when scroll is within the banner area
      // with some buffer for the nav height (~72px)
      const scrollY = window.scrollY
      const threshold = bannerHeight - 72
      setIsInBannerZone(scrollY < threshold)
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [bannerHeight])

  // Reset when navigating away
  const setLightBanner = useCallback((value) => {
    setIsLightBanner(value)
  }, [])

  const setDarkBanner = useCallback((value) => {
    setIsDarkBanner(value)
  }, [])

  const updateBannerHeight = useCallback((height) => {
    setBannerHeight(height)
  }, [])

  // Reset state when component unmounts (page navigation)
  useEffect(() => {
    return () => {
      setIsLightBanner(false)
      setIsDarkBanner(false)
      setBannerHeight(0)
    }
  }, [])

  return (
    <BannerContext.Provider
      value={{
        isLightBanner,
        isDarkBanner,
        isInBannerZone,
        setLightBanner,
        setDarkBanner,
        setBannerHeight: updateBannerHeight,
      }}
    >
      {children}
    </BannerContext.Provider>
  )
}

export function useBanner() {
  return useContext(BannerContext)
}
