import { ACTIVE_HERO, HERO_VARIANTS } from '../config/hero'
import HeroScrolling from '../components/HeroScrolling'
import HeroPainterly from '../components/HeroPainterly'
import HeroFluidBlob from '../components/HeroFluidBlob'
import SplitScreenProjects from '../components/SplitScreenProjects'
import About from '../components/About'

// Map hero variants to components
const heroComponents = {
  [HERO_VARIANTS.SOLSTICE]: HeroScrolling,
  [HERO_VARIANTS.PAINTERLY]: HeroPainterly,
  [HERO_VARIANTS.FLUID]: HeroFluidBlob,
}

export default function HomePage() {
  const HeroComponent = heroComponents[ACTIVE_HERO] || HeroScrolling

  return (
    <>
      <HeroComponent />
      <SplitScreenProjects />
      <About />
    </>
  )
}
