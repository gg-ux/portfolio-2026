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
        <div
          className={`overflow-hidden ${rounded ? 'rounded-xl' : ''} ${
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
            <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
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
  gap = 'gap-4 md:gap-6',
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 grid ${gridCols[columns]} ${gap} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {images.map((image, index) => (
        <figure key={index}>
          <div
            className={`overflow-hidden rounded-xl ${
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
          {image.caption && (
            <figcaption className="mt-3 text-center">
              <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
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
 * ProjectImageFullWidth - Full bleed image that breaks out of container
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
      className={`my-12 md:my-20 -mx-6 md:mx-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div className="max-w-[1440px] mx-auto px-0 md:px-12 lg:px-20">
        <div
          className={`overflow-hidden md:rounded-2xl ${
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
          <figcaption className="mt-4 text-center px-6 md:px-0">
            <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
              {caption}
            </Caption>
          </figcaption>
        )}
      </div>
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
          <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
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
      <Caption className={isDark ? 'text-white/30' : 'text-black/30'}>
        {label}
      </Caption>
    </div>
  )
}
