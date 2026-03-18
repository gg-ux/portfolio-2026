/**
 * Cover Letter Data - Single source of truth
 * Used by CoverLetterContent component in PrintPage
 */

import { personalInfo } from './resumeData'

export const defaultCoverLetter = {
  // Sender info - pulled from resumeData for consistency
  sender: {
    name: personalInfo.name,
    title: personalInfo.title,
    credentials: personalInfo.credentials,
    email: personalInfo.email,
    linkedin: personalInfo.linkedin,
    portfolioUrl: 'https://graceguo.io',
  },

  // Recipient placeholder (editable inline)
  recipient: {
    name: '[Hiring Manager]',
    title: '[Title]',
    company: '[Company Name]',
    address: '[Company Address]',
  },

  // Main content sections
  content: {
    greeting: 'Dear Hiring Team,',

    // Combined body text (single editable field)
    body: `I am writing to express my interest in the [Position Title] role at [Company Name]. With 7+ years of experience as a UX/UI designer and a Master's in Human-Computer Interaction & Design from UC Irvine, I bring a unique blend of strategic thinking and hands-on design expertise.

As Senior UX/UI Designer at Avala AI, I lead all design as the sole designer across multiple platforms, including AI dataset annotation tools, internal systems, and marketing sites. I collaborate directly with engineering and operations leadership to shape product roadmap and author PRDs, while rapidly shipping production code using agentic AI workflows.

Previously at Tesla, I led the global launch of responsive feature pages for Tesla.com and designed the mega menu and AI chatbot that achieved a 120% increase in sales lead conversions. I developed components for the Tesla Design System and redesigned internal enterprise apps used by advisors and installers.

I am excited about the opportunity to bring my experience in design systems, cross-functional collaboration, and AI-assisted development to [Company Name]. I would welcome the chance to discuss how my background aligns with your team's goals.`,

    signoff: 'Thank you for your consideration.',
    signature: personalInfo.name,
  },
}

// Company-specific overrides - merged with default
export const companyOverrides = {
  doordash: {
    recipient: {
      company: 'DoorDash',
    },
    content: {
      greeting: 'Dear DoorDash Hiring Team,',

      body: `I've spent my career making complexity invisible, and DoorDash's expansion into Retail is exactly the kind of 0-1 challenge I'm drawn to. Defining how millions of people shop for clothes, shoes, and electronics through DoorDash requires building new systems that scale across categories while maintaining the effortless experience your customers expect.

At Avala AI, an early stage startup, I'm the sole designer serving five distinct user types, shipping end-to-end while writing PRDs, coding production UI, and maintaining WCAG-compliant accessibility. At Tesla, I designed e-commerce and enterprise apps including Powerwall Parts Store, plus the mega menu and AI chatbot that boosted sales lead conversion by 120%. I've built from scratch repeatedly: INDI EV's in-vehicle interface, a HIPAA-compliant app for heart failure patients, and the entire design infrastructure at Avala. With experience across fast-paced startups and Fortune 500 corporations, I understand when to push for polish versus when to ship fast.

With 7+ years of experience and an MHCI+D from UC Irvine, I'm excited to bring my expertise in 0-1 product design, e-commerce, and scaling systems to the New Verticals team. My portfolio is at graceguo.io.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  dropbox: {
    recipient: {
      company: 'Dropbox',
    },
    content: {
      greeting: 'Dear Dropbox Hiring Team,',

      body: `I've spent my career making complex technology feel intuitive, and the opportunity to shape Dash as a Staff Designer is exactly the challenge I'm looking for. Helping people find what they need across fragmented tools and content requires thoughtful design that feels effortless while handling real complexity underneath.

At Avala AI, an early-stage startup, I'm the sole designer serving five distinct user types, driving design strategy while shipping production code, writing PRDs, and maintaining a WCAG-compliant component library using AI-assisted development workflows. At Tesla, I designed an AI chatbot that boosted sales lead conversion by 120% and led the mega menu redesign, improving content discoverability across Tesla.com. I've built 0-1 products from scratch repeatedly: INDI EV's in-vehicle interface, a HIPAA-compliant app for heart failure patients, and the entire design infrastructure at Avala. With experience across fast-paced startups and Fortune 500 corporations, I know when to push for craft versus when to ship fast.

With 7+ years of experience, an MHCI+D from UC Irvine, and a deep appreciation for Virtual First culture, I'm excited to bring my expertise in AI product design and design systems to the Dash team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  hungryroot: {
    recipient: {
      company: 'Hungryroot',
    },
    content: {
      greeting: 'Dear Hungryroot Hiring Team,',

      body: `I've spent my career making complex technology feel personal, and Hungryroot's mission to use AI for truly consumer-centric healthy living is exactly the kind of challenge I'm drawn to. Building a product that learns individual goals, lifestyles, and preferences requires thoughtful design that balances personalization with simplicity.

At Avala AI, an early-stage startup, I'm the sole designer serving five distinct user types, driving design strategy while shipping production code, writing PRDs, and maintaining a scalable component library using AI-assisted development workflows. At Tesla, I led the mega menu redesign improving content discoverability across Tesla.com, and designed an AI chatbot that boosted sales lead conversion by 120%. I've built 0-1 products from scratch repeatedly: INDI EV's in-vehicle interface, a HIPAA-compliant app for heart failure patients, and the entire design infrastructure at Avala. With experience across fast-paced startups and Fortune 500 corporations, I know when to push for polish versus when to ship fast.

With 7+ years of experience, an MHCI+D from UC Irvine, and a passion for remote-first collaboration, I'm excited to bring my expertise in consumer product design, design systems, and cross-functional storytelling to the Digital team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  calendly: {
    recipient: {
      company: 'Calendly',
    },
    content: {
      greeting: 'Dear Calendly Hiring Team,',

      body: `I've spent my career designing simple, intuitive experiences that drive user activation, and the Senior Product Designer, Growth role at Calendly is exactly the kind of data-informed challenge I'm drawn to. Helping solopreneurs and small teams discover and engage with products like AI Notetaker requires the iterative, user-centered approach I bring to every project.

At Avala AI, an early-stage startup, I'm the sole designer driving activation and engagement across platform, native mobile app, and learning systems, serving five distinct user types. I leverage quantitative and qualitative data to understand user behavior, design data-informed experiences, and communicate my approach with strong storytelling to align cross-functional stakeholders. At Tesla, I designed an AI chatbot that boosted sales lead conversion rates by 120%, led product pages that improved discovery across key activation funnels, and partnered cross-functionally with Product, Engineering, and Analytics. With experience across fast-paced startups and Fortune 500 corporations, I know how to balance business goals, user needs, and team processes.

With 7+ years of experience in product design, a data-driven approach to growth, and an MHCI+D from UC Irvine, I'm excited to bring my expertise in activation funnels and design storytelling to the Growth team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  spotify: {
    recipient: {
      company: 'Spotify',
    },
    content: {
      greeting: 'Dear Spotify Hiring Team,',

      body: `I've spent my career turning complexity into clarity for consumer products, and the Senior Product Designer role on Format Foundations is exactly the kind of craft-driven challenge I'm drawn to. Shaping how millions of users discover and connect with creators requires the kind of systematic thinking and attention to detail I bring to every project.

At Avala AI, an early-stage startup, I'm the sole designer leading end-to-end product design across data annotation platform, native mobile labeling app, and internal tools, architecting scalable design patterns while translating brand direction into cohesive product experiences. I ship production UI using AI-enabled tools and maintain WCAG-compliant accessibility throughout. At Tesla, I redesigned the native iOS/Android in-store advisor app used by sales advisors for lead generation and scheduling, designed an AI chatbot that boosted conversion rates by 120%, and contributed to the Tesla Design System partnering cross-functionally with Engineering and Product. At Catalia Health, I led a team designing an inclusive, accessible app for chronically ill patients. With experience across fast-paced startups and Fortune 500 corporations, I know when to push for craft versus when to ship fast.

With 7+ years of experience in consumer product design, a strong visual design foundation, and an MHCI+D from UC Irvine, I'm excited to bring my expertise in scalable systems and design craft to the Core Experience team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  waymo: {
    recipient: {
      company: 'Waymo',
    },
    content: {
      greeting: 'Dear Waymo Hiring Team,',

      body: `Throughout my career, I've gravitated toward work that shapes how people interact with vehicles and transportation—from Tesla's digital ecosystem to INDI EV's in-vehicle interface to building design systems for autonomous vehicle data labeling at Avala AI. The Senior Product Designer, Design Systems role at Waymo feels like the natural next step: making autonomous transportation intuitive and trustworthy through systematic design.

At Avala AI, an early-stage startup, I own end-to-end product design while architecting a scalable component library with design tokens for color, typography, and spacing, all while maintaining WCAG-compliant accessibility. I ship production UI using AI-assisted workflows and drive cross-functional alignment with Engineering and Data Science leadership. At Tesla, I contributed to the Tesla Design System with component guidelines and documentation, and led the mega menu redesign improving content discoverability at scale. At INDI EV, I led design of the in-vehicle interface for the company's debut electric car, establishing the UI and design system from scratch. With experience across fast-paced startups and Fortune 500 corporations, I know when to push for polish versus when to ship fast.

With 7+ years of experience in product design, advanced Figma expertise, and an MHCI+D from UC Irvine, I'm excited to bring my expertise in design systems architecture and HMI design to the Waymo team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  vercel: {
    recipient: {
      company: 'Vercel',
    },
    content: {
      greeting: 'Dear Vercel Hiring Team,',

      body: `I've spent my career designing system-based solutions for complex technical products, and the Senior Product Designer role at Vercel is exactly where I want to be. I already ship production UI using Claude Code daily, and the opportunity to design financial infrastructure for a platform I admire is a perfect fit.

At Avala AI, an early-stage startup, I'm the sole designer shipping production React code using Claude Code and deploying via Vercel, while architecting a scalable component library with design tokens. I know when to use the design system, when to break it, and when to evolve it based on product needs. I collaborate closely with Engineering to ship quickly while maintaining quality. At Tesla, I contributed to the Tesla Design System with component guidelines and design tokens, led the AI chatbot that boosted conversion by 120%, and guided implementation with Engineering across responsive web and native iOS/Android apps. With experience across fast-paced startups and Fortune 500 corporations, I'm comfortable in environments where engineering ships quickly.

With 7+ years designing in technical industries, fluency in modern design tooling from Figma to Claude Code, and an MHCI+D from UC Irvine, I'm excited to help ship remarkable software interfaces on the Product Design team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  classpass: {
    recipient: {
      company: 'ClassPass',
    },
    content: {
      greeting: 'Dear ClassPass Hiring Team,',

      body: `As a ClassPass member, I've experienced firsthand how the platform turns the friction of "I should work out" into the joy of discovering new studios. The Sr. Designer role on the Consumer team is exactly the kind of craft-driven, end-to-end challenge I'm drawn to. Designing personalized moments that convert curiosity into commitment requires both systems thinking and attention to the details that build trust.

At Avala AI, an early-stage startup, I'm the sole designer owning end-to-end product design across platform, native mobile app, and learning systems, serving five distinct user types. I shape vision, define flows, and ship quality while collaborating cross-functionally with Engineering and Operations leadership. At Tesla, I designed an AI chatbot that boosted sales lead conversion rates by 120% by removing friction and surfacing value at key moments, led the redesign of the native iOS/Android in-store advisor app, and contributed to the Tesla Design System. At Catalia Health, I led a team designing an accessible app for chronically ill patients, prioritizing trust and engagement. With experience across fast-paced startups and Fortune 500 corporations, I know when to push for craft versus when to ship fast.

With 7+ years of consumer product design experience, native mobile expertise, and an MHCI+D from UC Irvine, I'm excited to bring my end-to-end product thinking and design craft to the ClassPass team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  webflow: {
    recipient: {
      company: 'Webflow',
    },
    content: {
      greeting: 'Dear Webflow Hiring Team,',

      body: `I've spent my career making complex data feel obvious, and the Senior Product Designer role on Analyze is exactly the kind of systems-driven challenge I'm drawn to. Designing interfaces where data moves people to act requires rigorous systems thinking and the ability to ship quickly without sacrificing quality.

At Avala AI, an early-stage startup, I'm the sole designer owning end-to-end product design for a data annotation platform, designing complex workflows for LiDAR, 3D spatial data, and multi-frame sequences. I design in Figma and develop production UI using Claude Code, including data visualization and annotation tools, internal dashboards, and the marketing website. I build and maintain a component library with design tokens, and partner with Engineering and Operations leadership to align on requirements before design begins. At Tesla, I designed an AI chatbot with recommendation flows that boosted conversion by 120%, contributed to the Tesla Design System with component documentation, and partnered with Analytics to measure design impact. With experience across fast-paced startups and Fortune 500 corporations, I balance fast experiments with long-term systems thinking.

With 7+ years of experience designing data-heavy products, fluency in Figma and AI tools, and an MHCI+D from UC Irvine, I'm excited to bring my systems design expertise to the Analyze team.`,

      signoff: 'Looking forward to connecting,',
    },
  },
}

/**
 * Get cover letter content for a specific template
 * Merges company overrides with default content
 */
export const getCoverLetter = (templateId = 'default') => {
  if (templateId === 'default' || !companyOverrides[templateId]) {
    return defaultCoverLetter
  }

  const overrides = companyOverrides[templateId]

  return {
    ...defaultCoverLetter,
    recipient: {
      ...defaultCoverLetter.recipient,
      ...overrides.recipient,
    },
    content: {
      ...defaultCoverLetter.content,
      ...overrides.content,
    },
  }
}

/**
 * Get list of available templates for dropdown
 */
export const getAvailableTemplates = () => {
  return [
    { id: 'default', name: 'Default' },
    { id: 'doordash', name: 'DoorDash' },
  ]
}
