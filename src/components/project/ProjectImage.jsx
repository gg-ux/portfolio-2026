import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, CornersOut } from '@phosphor-icons/react'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Caption } from '../Typography'

/**
 * ProjectImage - Single image with optional caption
 * Can be full-width or contained
 */
export default function ProjectImage({
  src,
  alt,
  caption,
  fullWidth = false,
  rounded = true,
  glassBorder = false,
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Tighter spacing when no caption (matches space-y-6 gap between chart elements)
  const spacing = caption ? 'my-8 md:my-12' : 'my-6'

  return (
    <figure
      ref={ref}
      className={`${spacing} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div className={fullWidth ? 'max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20' : ''}>
        <div className={`relative ${glassBorder ? 'p-3' : ''}`}>
          <div
            className={`relative overflow-hidden ${rounded ? 'rounded-xl' : ''} ${
              isDark ? 'bg-[#111111]' : 'bg-gray-100'
            }`}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {glassBorder && (
            <div
              className={`absolute inset-0 rounded-2xl pointer-events-none border ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.015] shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                  : 'border-black/[0.08] bg-black/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
              }`}
            />
          )}
        </div>
        {caption && (
          <figcaption className="mt-4 text-center">
            <Caption className="theme-caption">
              {caption}
            </Caption>
          </figcaption>
        )}
      </div>
    </figure>
  )
}

/**
 * ProjectImageGrid - Multiple images in a responsive grid
 */
export function ProjectImageGrid({
  images,
  columns = 2,
  gap,
  glassBorder = false,
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  // Use larger gap for single column layouts with captions
  const defaultGap = columns === 1 ? 'gap-8 md:gap-12' : 'gap-4 md:gap-6'
  const gridGap = gap || defaultGap

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 grid ${gridCols[columns]} ${gridGap} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {images.map((image, index) => (
        <figure key={index}>
          <div className={`relative ${glassBorder ? 'p-3' : ''}`}>
            <div
              className={`relative overflow-hidden rounded-xl ${
                isDark ? 'bg-[#111111]' : 'bg-gray-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            {glassBorder && (
              <div
                className={`absolute inset-0 rounded-2xl pointer-events-none border ${
                  isDark
                    ? 'border-white/[0.08] bg-white/[0.015] shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                    : 'border-black/[0.08] bg-black/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
                }`}
              />
            )}
          </div>
          {image.caption && (
            <figcaption className="mt-3 text-center">
              <Caption className="theme-caption">
                {image.caption}
              </Caption>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

/**
 * ProjectImageFullWidth - Full width image within text container
 */
export function ProjectImageFullWidth({
  src,
  alt,
  caption,
  noBg = false,
  darkBg = false,
  glassBorder = false,
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Tighter spacing when no caption
  const spacing = caption ? 'my-8 md:my-12' : 'my-6'

  // Background logic: noBg > darkBg > theme-based
  const getBgClass = () => {
    if (noBg) return ''
    if (darkBg) return 'bg-[#111111]'
    return isDark ? 'bg-[#111111]' : 'bg-gray-100'
  }

  return (
    <figure
      ref={ref}
      className={`${spacing} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div className={`relative ${glassBorder ? 'p-3' : ''}`}>
        <div
          className={`overflow-hidden rounded-xl md:rounded-2xl ${getBgClass()}`}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        {glassBorder && (
          <div
            className={`absolute inset-0 rounded-2xl pointer-events-none border ${
              isDark
                ? 'border-white/[0.08] bg-white/[0.015] shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
                : 'border-black/[0.08] bg-black/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            }`}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-4 text-center">
          <Caption className="theme-caption">
            {caption}
          </Caption>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * ProjectVideo - Embedded video player with custom controls
 *
 * Desktop: Paused shows play button. Playing shows scrubber on hover. Click anywhere to pause.
 * Mobile: Paused shows play button. Tap while playing shows controls. Auto-hides after 3s.
 */
export function ProjectVideo({
  src,
  poster,
  caption,
  autoPlay = false,
  loop = true,
  muted = true,
  className = ''
}) {
  const { isDark } = useTheme()
  const [containerRef, isVisible] = useScrollReveal({ threshold: 0.1 })
  const videoRef = useRef(null)
  const hideTimeoutRef = useRef(null)

  const [isPaused, setIsPaused] = useState(!autoPlay)
  const [showControls, setShowControls] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Detect touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Format time as M:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Auto-hide controls after 3 seconds (mobile only)
  const resetHideTimer = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    if (!isPaused && isMobile) {
      hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
    }
  }, [isPaused, isMobile])

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  const handlePlay = () => videoRef.current?.play()
  const handlePause = () => videoRef.current?.pause()

  const handleContainerClick = (e) => {
    // Don't handle if clicking on scrubber
    if (e.target.closest('.video-scrubber')) return

    if (isMobile) {
      // Mobile: tap to play when paused, tap to toggle controls when playing
      if (isPaused) {
        handlePlay()
      } else {
        setShowControls(prev => !prev)
        resetHideTimer()
      }
    } else {
      // Desktop: click to play/pause
      isPaused ? handlePlay() : handlePause()
    }
  }

  const handleSeek = (e) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    if (videoRef.current) {
      videoRef.current.currentTime = percent * duration
    }
    resetHideTimer()
  }

  const handleFullscreen = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (video?.webkitEnterFullscreen) video.webkitEnterFullscreen() // iOS
    else if (video?.requestFullscreen) video.requestFullscreen()
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const spacing = caption ? 'my-8 md:my-12' : 'my-6'

  // Show scrubber: desktop on hover while playing, mobile on tap while playing
  const showScrubber = !isPaused && (isMobile ? showControls : isHovering)

  // Glassmorphic button style
  const buttonStyle = {
    background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'
  }
  const iconColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)'

  return (
    <figure
      ref={containerRef}
      className={`${spacing} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl cursor-pointer ${
          isDark ? 'bg-[#111111]' : 'bg-gray-100'
        }`}
        onClick={handleContainerClick}
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          className="w-full h-auto"
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        />

        {/* Play button overlay (when paused) */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/[0.13] transition-opacity duration-300 ${
            isPaused ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
            style={buttonStyle}
          >
            <Play size={28} weight="fill" style={{ color: iconColor, marginLeft: '3px' }} />
          </div>
        </div>

        {/* Mobile only: Centered pause button when controls visible */}
        {isMobile && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              showControls && !isPaused ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md cursor-pointer"
              style={buttonStyle}
              onClick={(e) => { e.stopPropagation(); handlePause() }}
            >
              <Pause size={28} weight="fill" style={{ color: iconColor }} />
            </div>
          </div>
        )}

        {/* Scrubber bar (desktop: hover, mobile: tap) */}
        <div
          className={`video-scrubber absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
            showScrubber ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.4))' }}
        >
          <div className="flex items-center gap-3">
            {/* Pause button (desktop only - mobile has centered button) */}
            {!isMobile && (
              <button
                className="p-2 rounded-full backdrop-blur-sm"
                style={{ background: 'rgba(255, 255, 255, 0.15)' }}
                onClick={(e) => { e.stopPropagation(); handlePause() }}
              >
                <Pause size={18} weight="fill" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
              </button>
            )}

            {/* Progress bar */}
            <div
              className="flex-1 h-1 rounded-full cursor-pointer relative"
              style={{ background: 'rgba(255, 255, 255, 0.3)' }}
              onClick={handleSeek}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            {/* Time */}
            <span className="text-xs font-medium tabular-nums text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Fullscreen */}
            <button
              className="p-2 rounded-full backdrop-blur-sm"
              style={{ background: 'rgba(255, 255, 255, 0.15)' }}
              onClick={handleFullscreen}
            >
              <CornersOut size={18} weight="bold" style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
            </button>
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-center">
          <Caption className="theme-caption">
            {caption}
          </Caption>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * ProjectVimeo - Embedded Vimeo player
 */
export function ProjectVimeo({
  url,
  caption,
  aspectRatio = '16/9',
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Extract Vimeo video ID from URL
  const getVimeoId = (vimeoUrl) => {
    const match = vimeoUrl.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  const videoId = getVimeoId(url)
  if (!videoId) return null

  // Tighter spacing when no caption
  const spacing = caption ? 'my-8 md:my-12' : 'my-6'

  return (
    <figure
      ref={ref}
      className={`${spacing} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div
        className={`overflow-hidden rounded-xl md:rounded-2xl isolate relative ${
          isDark ? 'bg-[#111111]' : 'bg-gray-100'
        }`}
        style={{ aspectRatio, transform: 'translateZ(0)' }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=0&title=0&byline=0&portrait=0`}
          className="absolute block"
          style={{
            border: 0,
            width: '103%',
            height: '103%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center">
          <Caption className="theme-caption">
            {caption}
          </Caption>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * ProjectYouTube - Embedded YouTube player
 */
export function ProjectYouTube({
  url,
  caption,
  aspectRatio = '16/9',
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (youtubeUrl) => {
    const patterns = [
      /youtu\.be\/([^?&]+)/,
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtube\.com\/embed\/([^?&]+)/,
    ]
    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const videoId = getYouTubeId(url)
  if (!videoId) return null

  // Tighter spacing when no caption
  const spacing = caption ? 'my-8 md:my-12' : 'my-6'

  return (
    <figure
      ref={ref}
      className={`${spacing} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div
        className={`overflow-hidden rounded-xl md:rounded-2xl ${
          isDark ? 'bg-[#111111]' : 'bg-gray-100'
        }`}
        style={{ aspectRatio }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center">
          <Caption className="theme-caption">
            {caption}
          </Caption>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * ChartCaption - Consistent caption for charts and visualizations
 * Centered, mono font, uppercase, theme-aware
 */
export function ChartCaption({ children, className = '' }) {
  return (
    <figcaption className={`mt-6 mb-10 text-center ${className}`}>
      <span className="font-mono text-[12px] tracking-wide uppercase theme-caption">
        {children}
      </span>
    </figcaption>
  )
}

/**
 * ProjectImagePlaceholder - Placeholder for images not yet available
 */
export function ProjectImagePlaceholder({
  aspectRatio = '16/9',
  label = 'Image Coming Soon',
  className = ''
}) {
  const { isDark } = useTheme()

  return (
    <div
      className={`my-8 md:my-12 rounded-xl flex items-center justify-center ${
        isDark
          ? 'bg-white/[0.03] border border-dashed border-white/10'
          : 'bg-black/[0.02] border border-dashed border-black/10'
      } ${className}`}
      style={{ aspectRatio }}
    >
      <Caption className="theme-caption opacity-50">
        {label}
      </Caption>
    </div>
  )
}
