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

  return (
    <figure
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
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
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <figure
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div
        className={`overflow-hidden rounded-xl md:rounded-2xl ${
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
 * ProjectVideo - Embedded video player
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
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <figure
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div
        className={`overflow-hidden rounded-xl ${
          isDark ? 'bg-[#111111]' : 'bg-gray-100'
        }`}
      >
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          className="w-full h-auto"
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

  return (
    <figure
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div
        className={`overflow-hidden rounded-xl ${
          isDark ? 'bg-[#111111]' : 'bg-gray-100'
        }`}
        style={{ aspectRatio }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=0&title=0&byline=0&portrait=0`}
          className="w-full h-full"
          frameBorder="0"
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

  return (
    <figure
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
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
