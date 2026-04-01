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

  figma: {
    recipient: {
      company: 'Figma',
    },
    content: {
      greeting: 'Dear Figma Hiring Team,',

      body: `As someone who designs in Figma and ships production code using AI, the Product Designer role on Design, Dev, & AI Tools feels like the place I should be. I spend my days turning ambiguity into clarity for complex creative workflows, and the opportunity to shape how teams build together at the company that made my work possible is deeply exciting.

At Avala AI, an early-stage startup, I'm the sole designer for a canvas-based data annotation platform, serving five distinct user types with complex workflows. I architect scalable design systems using Variables, Auto Layout, and Components, then ship production React code using Claude Code. At Tesla, I designed an AI chatbot that boosted sales lead conversion by 120% through iterative prototyping and interaction refinement. I contributed to the Tesla Design System with component guidelines and design tokens, and led responsive product pages from discovery through launch while collaborating cross-functionally with PMs, engineers, and researchers. I've built 0-1 products repeatedly: INDI EV's in-vehicle interface, a HIPAA-compliant app for heart failure patients, and the entire design infrastructure at Avala. With experience across fast-paced startups and Fortune 500 corporations, I know when to push for craft versus when to ship fast.

With 7+ years of systems thinking, deep fluency in Figma and AI tooling, and an MHCI+D from UC Irvine, I'm excited to help invent new ways for people to design and build products together.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  netflix: {
    recipient: {
      company: 'Netflix',
    },
    content: {
      greeting: 'Dear Netflix Hiring Team,',

      body: `I've spent my career designing horizontal solutions for deeply technical domains, and the Senior Product Designer role on Media Platforms is exactly the kind of challenge I thrive in. Building foundational infrastructure that powers diverse business products requires the systematic thinking and cross-functional collaboration I bring to every project.

At Avala AI, an early-stage startup, I'm the sole designer for an enterprise data management platform serving five distinct user types with complex workflows. I navigate ambiguity daily, mapping systems, defining workflows, and crafting solutions that connect user needs, data, and business goals. I partner closely with engineering leadership and ship production React code myself, demonstrating my ability to think technically and collaborate with engineers. At Tesla, I designed an AI chatbot that boosted sales lead conversion by 120%, contributed systematic solutions to the Tesla Design System, and designed enterprise apps for Energy Installers and Powerwall Parts Store. At Accurate Background, I designed horizontal solutions for a background check platform serving thousands of global users across diverse business verticals. With experience across fast-paced startups and Fortune 500 corporations, I know how to drive clarity while balancing user needs, technology constraints, and business strategy.

With 7+ years of enterprise product design experience, mastery of Figma's advanced features, and an MHCI+D from UC Irvine, I'm excited to bring my passion for foundational solutions to the Content Business Product team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'netflix-commerce': {
    recipient: {
      company: 'Netflix',
    },
    content: {
      greeting: 'Dear Netflix Hiring Team,',

      body: `I'm a systems thinker who's spent my career building design systems and consumer experiences across mobile and web, and the Product Designer, Commerce (Platform) role is exactly where I want to be. The opportunity to extend Hawkins and create design patterns that power Netflix's Commerce organization combines my passion for systematic design with my love of consumer products that reach global audiences.

At Avala AI, an early-stage startup, I'm the sole designer creating design system components and guidelines that scale across platforms. I employ storytelling to present UX strategy, navigate ambiguity to break down opportunities into actionable roadmaps, and deliver pixel-perfect mockups from concept to launch. At Tesla, I designed an AI chatbot that boosted sales lead conversion by 120%, contributed to the Tesla Design System with component guidelines and patterns, and led responsive product pages for Tesla.com reaching 220M+ visitors. I've shipped across mobile and web repeatedly: native iOS/Android apps at Tesla, INDI EV's in-vehicle interface, and a healthcare app for Catalia Health. With experience across startups and Fortune 500 corporations, I know how to partner humbly with PMs, engineers, and stakeholders to find the best solution together.

With 7+ years of consumer product design, deep Figma expertise, and an MHCI+D from UC Irvine, I'm excited to bring my systems thinking and craft to the Commerce XD team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'doordash-drive': {
    recipient: {
      company: 'DoorDash',
    },
    content: {
      greeting: 'Dear DoorDash Hiring Team,',

      body: `I'm a craftsperson who's spent my career building new products from scratch, and the Senior Product Designer role on Drive is exactly the kind of challenge I thrive in. Building logistics and delivery experiences that sit at the intersection of the physical and digital worlds requires the clarity-driving, detail-sweating approach I bring to every project.

At Tesla, I designed the Energy Installers app for tracking Powerwall installation arrivals, serving both customers and installers with real-time logistics. I also owned the in-store advisor app for scheduling test drives and customer follow-up, and led responsive product pages for Tesla.com. At Avala AI, I own product areas end to end as sole designer, building a design system that spans our data platform, native mobile app, internal tools, and marketing site while driving clarity in ambiguous spaces. At INDI EV, I led 0 to 1 design of the in-vehicle interface, defining vision from scratch. With experience across fast-paced startups and Fortune 500 corporations, I know how to influence product development while partnering humbly with PMs, engineers, and stakeholders.

With 7+ years building products from scratch and an MHCI+D from UC Irvine, I'm ready to own product areas end to end and help Drive redefine innovation in the delivery space.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  stubhub: {
    recipient: {
      company: 'StubHub',
    },
    content: {
      greeting: 'Dear StubHub Hiring Team,',

      body: `I've spent my career building and evolving design systems, and the Senior Design Systems Designer role is exactly the kind of foundational work I thrive in. Creating component and variable libraries that scale across web and mobile while exploring AI patterns for generative content requires the systematic thinking and documentation rigor I bring to every project.

At Avala AI, I built our design system from scratch, maintaining component libraries, design tokens, and documentation that span our web platform, native mobile app, and internal tools. I use Claude Code to turn design patterns into reusable skills, giving me hands-on experience with AI patterns that could inform generative design features. At Tesla, I contributed to the Tesla Design System in Figma with component guidelines and documentation used across Tesla.com and native iOS/Android applications, collaborating with cross-functional stakeholders on system governance and adoption. At INDI EV, I established the foundational UI and component library for the in-vehicle interface from scratch. With experience across fast-paced startups and Fortune 500 corporations, I know how to balance systematic rigor with the speed of shipping.

With 7+ years of design systems experience, deep Figma expertise including Variables and component libraries, the ability to ship production components using Claude Code, and an MHCI+D from UC Irvine, I'm excited to help build the foundational design infrastructure that powers StubHub's web and mobile experiences.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'disney-ai': {
    recipient: {
      company: 'Disney',
    },
    content: {
      greeting: 'Dear Disney Hiring Team,',

      body: `I've spent my career translating complex technical capabilities into intuitive, trusted experiences, and the Senior UX Designer role shaping AI-enabled enterprise workflows at Disney is exactly where I want to be. The opportunity to design systems that augment human decision-making for teams creating the world's most beloved content is incredibly exciting.

At Avala AI, I'm the sole designer at an engineer-led startup, shipping end-to-end enterprise workflows using agentic AI development (Claude Code), including internal tools with AI-powered features like automated ticketing and operations dashboards. I own UX from problem framing through delivery for five distinct user types across ambiguous problem spaces, partnering deeply with Engineering and Operations leadership to ensure designs are technically feasible and implementation-ready. At Tesla, I designed AI chatbot automation flows that boosted sales lead conversion by 120% by intelligently routing users and freeing advisors to focus on high-intent customers. I also contributed to complex enterprise workflows for internal tools like Energy Installers and Powerwall Parts Store. At Accurate Background, I designed data-rich compliance workflows for a B2B platform serving thousands of global users, translating complex operational processes into clear, usable interactions.

With 7+ years designing AI-enabled and enterprise applications, strong systems thinking, and an MHCI+D from UC Irvine, I'm excited to help shape the next generation of AI-augmented experiences at Disney.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'apple-appstore': {
    recipient: {
      company: 'Apple',
    },
    content: {
      greeting: 'Dear App Store Product Design Team,',

      body: `I've spent my career tackling complex problems and crafting sophisticated, simple solutions that surprise and delight users. The Product Designer role on the App Store team is exactly the kind of multi-platform, consumer-facing challenge I'm drawn to. Designing experiences that billions of people interact with every month requires the extraordinary visual craft and user-centered thinking I bring to every project.

At Avala AI, I'm the sole designer creating experiences across web and iOS for five distinct user types, each with unique workflows. I create design mockups, prototypes, and production visual assets with keen attention to typography, color use, and subtle details. I collaborate cross-functionally with Engineering and Operations leadership, presenting design ideas and documentation for proper implementation. At Tesla, I designed across multiple platforms including responsive web and native iOS/Android applications reaching millions of users worldwide. I led the AI chatbot that boosted sales lead conversion by 120% through intuitive, delightful interactions, and contributed to the Tesla Design System with component guidelines and visual specifications. I've consistently delivered in dynamic, deadline-driven environments: INDI EV's in-vehicle interface for LA Auto Show debut, and collaborative audio software at Notetracks.

With 7+ years of multi-platform design experience, a passion for the Apple design aesthetic, and an MHCI+D from UC Irvine, I'm excited to bring my visual craft and user-centered approach to the App Store Product Design team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'apple-video': {
    recipient: {
      company: 'Apple',
    },
    content: {
      greeting: 'Dear Video Applications Design Team,',

      body: `I've spent my career distilling sophisticated technical challenges into intuitive, accessible design solutions, and the Product Designer role on Video Applications is exactly the kind of challenge I'm drawn to. The opportunity to shape how video creators worldwide tell their stories through Apple's software is deeply exciting.

At Avala AI, I'm the sole designer for a multi-platform product (web and iOS), designing frame-based editing workflows with timeline navigation, playback controls, and cross-frame editing for 3D data sequences. This work requires deep understanding of creative tooling patterns familiar to video editors: scrubbing through frames, making precise edits across sequences, and managing complex multi-track data. I create high-fidelity prototypes with extraordinary attention to interaction design and visual craft. At Tesla, I designed across multiple platforms including responsive web and native iOS/Android applications, contributing to the Tesla Design System with component guidelines and visual specifications. I led the AI chatbot that boosted sales lead conversion by 120% and presented concepts to cross-functional teams including Senior Management. At Notetracks, I designed timeline-based interfaces for a collaborative audio arranging app, demonstrating my understanding of creative workflows. I've delivered in deadline-driven environments repeatedly: INDI EV's in-vehicle interface for LA Auto Show, and rapid iteration at a fast-paced startup.

With 7+ years of multi-platform design experience, hands-on experience designing frame-based creative tools, and an MHCI+D from UC Irvine, I'm excited to bring my passion for accessible, transformational design to the Video Applications team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'apple-music': {
    recipient: {
      company: 'Apple',
    },
    content: {
      greeting: 'Dear Apple Creator Studio Team,',

      body: `As someone who produces music in Ableton as a hobby and has designed UI for music collaboration software professionally, the UI Designer role on Music Creation Apps feels like a natural fit. The opportunity to shape how millions of creators interact with Logic Pro, GarageBand, and MainStage is exactly the kind of craft-driven, workflow-focused challenge I'm drawn to.

At Notetracks, I designed UI for a collaborative cloud-based audio arranging app used by music producers and audio professionals, iteratively refining complex workflows through user feedback. At Avala AI, I'm the sole designer for a workflow-driven data management, visualization, and annotation platform, distilling intricate design challenges into elegant solutions for professional users handling deep, complex multi-step workflows. I create detailed visual specifications for engineering implementation and collaborate cross-functionally with product and engineering leadership. At Tesla, I designed native iOS and Android applications and an AI chatbot that boosted conversion by 120% through nuanced interaction design. I contributed to the Tesla Design System with component guidelines and presented UI concepts to cross-functional stakeholders and executives. At INDI EV, I led UI design for the in-vehicle interface from scratch, delivering a high-fidelity prototype with refined typography, layout, and motion behavior for LA Auto Show debut.

With 7+ years of UI design experience across iOS, web, and native platforms, hands-on experience with music production software, and an MHCI+D from UC Irvine, I'm excited to bring my passion for elegant design and creative tools to the Music Creation Apps team.`,

      signoff: 'Looking forward to connecting,',
    },
  },

  'meta-research': {
    recipient: {
      company: 'Meta',
    },
    content: {
      greeting: 'Dear Meta Research Platform Team,',

      body: `I'm an AI-native designer who ships production code using Claude daily, and the opportunity to help build AI-first platforms for researchers across Meta is exactly the kind of challenge I thrive in. Building internal tooling that empowers teams to move faster requires both strong visual craft and the systems thinking to design platforms that scale.

At Avala AI, an early-stage startup, I'm the sole designer building AI-native internal tools, operational dashboards, and learning systems that serve five distinct user types. I ship production UI using Claude Code and AI-assisted workflows, proactively solving problems without waiting for complete requirements. I author PRDs, collaborate with engineering leadership on product strategy, and maintain a design system with strong visual craft. At Tesla, I designed enterprise apps for Energy Installers and Powerwall Parts Store, building internal tooling that improved operational efficiency. I also led the AI chatbot that boosted sales lead conversion by 120%, demonstrating my ability to design AI-powered experiences. I contributed to the Tesla Design System with systematic patterns across platforms, partnering with 8+ cross-functional stakeholders. At Accurate Background, I designed enterprise platform tooling for internal operations teams, creating data-heavy compliance workflows.

With 7+ years of experience in enterprise and internal tooling, hands-on AI adoption using Claude and Figma, and an MHCI+D from UC Irvine, I'm excited to bring my systems thinking and visual craft to the Central Product Platform team.`,

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
    { id: 'disney-ai', name: 'Disney (AI Enterprise)' },
    { id: 'apple-appstore', name: 'Apple (App Store)' },
    { id: 'apple-music', name: 'Apple (Music Creation)' },
    { id: 'apple-video', name: 'Apple (Video Apps)' },
    { id: 'doordash', name: 'DoorDash' },
    { id: 'doordash-drive', name: 'DoorDash (Drive)' },
    { id: 'dropbox', name: 'Dropbox' },
    { id: 'hungryroot', name: 'Hungryroot' },
    { id: 'calendly', name: 'Calendly' },
    { id: 'meta-research', name: 'Meta (Research Platform)' },
    { id: 'spotify', name: 'Spotify' },
    { id: 'waymo', name: 'Waymo' },
    { id: 'vercel', name: 'Vercel' },
    { id: 'classpass', name: 'ClassPass' },
    { id: 'webflow', name: 'Webflow' },
    { id: 'figma', name: 'Figma' },
    { id: 'netflix', name: 'Netflix (Media Platform)' },
    { id: 'netflix-commerce', name: 'Netflix (Commerce)' },
    { id: 'stubhub', name: 'StubHub' },
  ]
}
