/**
 * Shared resume data - single source of truth
 * Used by both ResumePage and ResumePrintPage
 */

export const personalInfo = {
  name: 'Grace Guo',
  title: 'Senior Product Designer',
  credentials: 'MHCI+D',
  tagline: 'Senior Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience. I move between visual craft, system architecture, and production code—from automotive interfaces to AI products.',
  email: 'graceguo.design@gmail.com',
  linkedin: 'linkedin.com/in/grace-guo-ux',
  linkedinUrl: 'https://www.linkedin.com/in/grace-guo-ux/',
  dribbble: 'https://dribbble.com/graceeful',
}

export const experience = [
  {
    company: 'Avala AI',
    location: 'Remote',
    logo: '/assets/resume/avala-logo.png',
    title: 'Senior Product Designer',
    dates: 'Jun 2024 – Present',
    bullets: [
      'Lead all design as sole designer across data annotation platform, native mobile labeling app, marketing site, internal tools, and learning systems',
      'Build and maintain design system with component library in Figma; ship production React components and design tokens using Claude Code',
      'Design for five distinct user types (annotators, customers, admins, investors, general public) each with unique workflows and mental models',
      'Design complex annotation workflows for LiDAR, 3D spatial data, and multi-frame sequences, driving improvements to task efficiency, learnability, and UI clarity',
      'Author PRDs and partner with engineering and operations leadership to prioritize features and shape product roadmap',
    ],
    // For print version - more concise
    printBullets: [
      'Lead all design as sole designer across data annotation platform, native mobile labeling app, marketing site, internal tools, and learning systems',
      'Build and maintain design system with component library in Figma; ship production React components and design tokens using Claude Code',
      'Design for five distinct user types (annotators, customers, admins, investors, general public) each with unique workflows and mental models',
      'Design complex annotation workflows for LiDAR, 3D spatial data, and multi-frame sequences, driving improvements to task efficiency, learnability, and UI clarity',
      'Author PRDs and partner with engineering and operations leadership to prioritize features and shape product roadmap',
    ]
  },
  {
    company: 'Tesla',
    location: 'Hawthorne, CA',
    logo: '/assets/resume/tesla-logo.png',
    title: 'UX/UI Designer',
    dates: 'Nov 2021 – Apr 2024',
    bullets: [
      'Led global launch of responsive product and feature pages for Tesla.com, driving product discovery across Energy, Support, and Investor Relations',
      'Contributed to Tesla Design System in Figma with component guidelines and documentation across web and native platforms',
      'Led design of mega menu across Tesla.com, creating scalable navigation components for content discoverability',
      'Led design of AI chatbot, consolidating chat components and boosting sales lead conversion rates by 120%',
      'Led redesign of native iOS/Android in-store advisor app for scheduling test drives; designed Energy Installers app for tracking Powerwall installation arrivals',
    ],
    printBullets: [
      'Led global launch of responsive product and feature pages for Tesla.com, driving product discovery across Energy, Support, and Investor Relations',
      'Contributed to Tesla Design System in Figma with component guidelines and documentation across web and native platforms',
      'Led design of mega menu across Tesla.com, creating scalable navigation components for content discoverability',
      'Led design of AI chatbot, consolidating chat components and boosting sales lead conversion rates by 120%',
      'Led redesign of native iOS/Android in-store advisor app for scheduling test drives; designed Energy Installers app for tracking Powerwall installation arrivals',
    ],
  },
  {
    company: 'Accurate Background',
    location: 'Irvine, CA',
    logo: '/assets/resume/accurate-logo.png',
    title: 'UX/UI Designer',
    dates: 'May 2018 – Oct 2021',
    bullets: [
      'Created compliance-focused error-detection tool that automatically flagged background check inconsistencies, streamlining QA review',
      'Enhanced background check experience with improved information architecture and streamlined ID verification',
      'Collaborated cross-functionally with overseas engineering teams to align on requirements, prioritize features, and deliver platform improvements',
    ],
    printBullets: [
      'Created compliance-focused error-detection tool that flagged background check inconsistencies, streamlining QA',
      'Enhanced background check experience with improved IA and streamlined ID verification',
      'Collaborated with overseas engineering teams to align on requirements and deliver platform improvements',
    ],
  },
  {
    company: 'Notetracks',
    location: 'Remote',
    logo: '/assets/resume/notetracks-logo.png',
    title: 'UX/UI Designer',
    dates: 'Nov 2019 – Jan 2021',
    bullets: [
      'Collaborated with founder to enhance collaborative cloud-based audio arranging and note-taking web app',
      'Iteratively designed and refined user experiences through BETA user feedback',
      'Designed key website flows for Pricing, Account Settings, and Project Dashboard',
      'Created marketing materials for social media ads and flyers',
    ],
    showInPrint: false, // Hide from print version
  },
  {
    company: 'INDI EV',
    location: 'Los Angeles, CA',
    logo: '/assets/resume/indi-ev-logo.png',
    title: 'UX/UI Designer',
    dates: 'Aug 2020 – Sep 2021',
    bullets: [
      'Led 0-1 design of the in-vehicle interface (HMI) for INDI EV\'s debut electric car, establishing UI and design system from scratch',
      'Delivered high-fidelity prototype with key driver flows and vehicle control features for LA Auto Show debut',
      'Collaborated with animator to create demo reel showcased within vehicle at LA Auto Show',
    ],
    printBullets: [
      'Led 0-1 design of the in-vehicle interface (HMI) for INDI EV\'s debut electric car, establishing UI and design system from scratch',
      'Delivered high-fidelity prototype with key driver flows and vehicle control features for LA Auto Show debut',
    ],
  },
  {
    company: 'Catalia Health',
    location: 'Remote',
    logo: '/assets/resume/catalia-logo.png',
    title: 'UX/UI Designer & Researcher',
    dates: 'Apr 2019 – Sep 2019',
    bullets: [
      'Led team of 4 in the design of an accessible, HIPAA-compliant community app for heart failure patients',
      'Assisted in user research (interviews, card sorts, surveys) of 42 participants',
      'Led design brainstorming sessions and development of wireframes',
      'Delivered high-fidelity prototype tested with chronically ill patients, demonstrating 2-3 key community feature flows',
    ],
    printBullets: [
      'Led team of 4 in designing an accessible, HIPAA-compliant community app for heart failure patients',
      'Conducted user research (interviews, card sorts, surveys) with 42 participants',
      'Delivered high-fidelity prototype tested with chronically ill patients',
    ],
    showInPrint: true,
  },
]

export const education = [
  {
    school: 'University of California, Irvine',
    degree: 'Master of Human-Computer Interaction & Design',
    dates: '2018 – 2019',
    award: 'Mid-Year Fellowship',
  },
  {
    school: 'University of California, Irvine',
    degree: 'Bachelor of Arts in Psychology',
    dates: '2013 – 2017',
  },
]

export const skills = {
  design: [
    'Product Design',
    'Design Systems',
    'Native Mobile (iOS/Android)',
    'Interaction Design',
    'Visual Design',
    'Information Architecture',
    'Accessibility (WCAG)',
    'Rapid Prototyping',
  ],
  development: [
    'React/HTML/CSS/JS',
    'Agentic AI Workflows',
    'AI-Assisted Development',
    'Front-End Development',
  ],
  strategy: [
    '0-1 Product Design',
    'PRD Writing',
    'Cross-Functional Collaboration',
    'Stakeholder Storytelling',
    'User Research',
    'Requirements Gathering',
  ],
  tools: [
    'Figma',
    'GitHub',
    'Vercel',
    'Claude Code',
    'Warp',
    'Midjourney',
    'Adobe Creative Suite',
    'Jira',
    'Confluence',
  ],
}

// Shorter skills list for print (fits better)
export const printSkills = {
  design: ['Product Design', 'Design Systems', 'Native Mobile (iOS/Android)', 'Interaction Design', 'Visual Design', 'Accessibility (WCAG)'],
  development: ['React/HTML/CSS/JS', 'Agentic AI Workflows', 'AI-Assisted Development', 'Front-End Development'],
  strategy: ['0-1 Product Design', 'PRD Writing', 'Stakeholder Storytelling', 'Cross-Functional Collaboration'],
  tools: ['Figma', 'GitHub', 'Vercel', 'Claude Code', 'Warp', 'Midjourney'],
}

export const languages = [
  { name: 'English', level: 'Native', proficiency: 100 },
  { name: 'Mandarin (Chinese)', level: 'Proficient', proficiency: 80 },
]

// Helper to get experience for print (filtered and with print-specific bullets)
export const getPrintExperience = (templateId = 'default') => {
  const overrides = resumeTemplateOverrides[templateId]

  return experience
    .filter(job => {
      // If template explicitly hides this job, don't show it
      if (overrides?.hideJobs?.includes(job.company)) return false
      // If template has explicit experienceOverrides for this job, show it
      if (overrides?.experienceOverrides?.[job.company]) return true
      // Otherwise use the default showInPrint setting
      return job.showInPrint !== false
    })
    .map(job => {
      // Check for template-specific overrides
      const templateBullets = overrides?.experienceOverrides?.[job.company]
      const templateTitle = overrides?.titleOverrides?.[job.company]
      return {
        ...job,
        title: templateTitle || job.title,
        bullets: templateBullets || job.printBullets || job.bullets,
      }
    })
}

// Template-specific resume overrides
export const resumeTemplateOverrides = {
  default: null,

  doordash: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about 0-1 product design, consumer experiences, and building systems at scale.',
    skills: {
      design: ['Product Design', 'Design Systems', 'Component Libraries', 'Interaction Design', 'Visual Design', 'Data Visualization'],
      development: ['React/HTML/CSS/JS', 'Agentic AI Workflows', 'AI-Assisted Development', 'Front-End Development'],
      strategy: ['0-1 Product Design', 'PRD Writing', 'Stakeholder Storytelling', 'Cross-Functional Collaboration'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
  },

  dropbox: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about AI product design, design craft, and making complex technology feel seamless.',
    skills: {
      design: ['AI Product Design', 'Design Systems', 'Design Strategy', 'Interaction Design', 'Visual Design', 'Design Craft'],
      development: ['React/HTML/CSS/JS', 'Agentic AI Workflows', 'AI-Assisted Development', 'Remote Collaboration'],
      strategy: ['0-1 Product Design', 'PRD Writing', 'Stakeholder Storytelling', 'Cross-Functional Leadership'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead all design as sole designer for data annotation platform, serving five distinct user types with unique workflows and mental models',
        'Drive design strategy: author PRDs, shape product roadmap, and collaborate with engineering leadership on technical decisions',
        'Design and ship production UI in React using AI-assisted development workflows, maintaining WCAG-compliant accessibility and a scalable component library',
        'Design complex annotation workflows for LiDAR, 3D spatial data, and multi-frame sequences, driving measurable gains in efficiency',
        'Own brand design and visual identity across investor decks, trade shows, merchandise, and collateral',
      ],
      'Tesla': [
        'Led global launch of responsive product and feature pages for Tesla.com, driving product discovery across Energy, Support, and Investor Relations',
        'Led design of mega menu across Tesla.com, improving content discoverability and scalability',
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% after launch',
        'Led redesign of in-store advisor app; contributed to enterprise and e-commerce apps for Energy Installers and Powerwall Parts Store',
        'Contributed to Tesla Design System with component guidelines and design tokens; presented design rationale to cross-functional stakeholders',
      ],
    },
  },

  hungryroot: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about consumer product design, personalization, and making complex systems feel simple.',
    skills: {
      design: ['Consumer Product Design', 'Design Systems', 'System-Level Thinking', 'Interaction Design', 'Visual Design', 'Rapid Prototyping'],
      development: ['React/HTML/CSS/JS', 'Agentic AI Workflows', 'AI-Assisted Development', 'Front-End Development'],
      strategy: ['User-Centered Design', 'PRD Writing', 'Stakeholder Storytelling', 'Cross-Functional Collaboration'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead all design as sole designer across data annotation platform, marketing site, internal tools, learning systems, and annotator app, serving five distinct user types',
        'Design and ship production UI in React using AI-assisted development workflows, maintaining WCAG-compliant accessibility and a scalable component library',
        'Drive design strategy: author PRDs, shape product roadmap, and collaborate with engineering leadership on technical decisions',
        'Own brand design and visual identity across investor decks, trade shows, merchandise, and collateral',
      ],
      'Tesla': [
        'Led global launch of responsive product and feature pages for Tesla.com; used storytelling to present design rationale and drive alignment across cross-functional stakeholders',
        'Led design of mega menu across Tesla.com, improving content discoverability and navigation at scale',
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% after launch',
        'Contributed to Tesla Design System with detailed component guidelines and design specs',
        'Led redesign of in-store advisor app; contributed to enterprise and e-commerce apps for Energy Installers and Powerwall Parts Store',
      ],
    },
  },

  calendly: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about growth design, data-driven experimentation, and creating simple experiences that drive activation.',
    skills: {
      design: ['Growth Design', 'Product Design', 'Data-Driven Design', 'Interaction Design', 'Visual Design', 'Rapid Prototyping'],
      development: ['React/HTML/CSS/JS', 'AI-Assisted Development', 'A/B Testing', 'Front-End Development'],
      strategy: ['Activation Funnels', 'Design Storytelling', 'Cross-Functional Collaboration', 'User Behavior Analysis'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead end-to-end product design as sole designer, driving activation and engagement across data annotation platform, native mobile app, and learning systems',
        'Leverage quantitative and qualitative data to understand user behavior and improve onboarding funnels across five distinct user types',
        'Design iterative, data-informed experiences based on user feedback and engagement metrics',
        'Communicate design approach with strong storytelling to align cross-functional stakeholders on product direction',
      ],
      'Tesla': [
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% through iterative UX improvements',
        'Led global launch of responsive product pages for Tesla.com, improving product discovery and activation across Energy, Support, and Investor Relations',
        'Led design of mega menu, improving content discoverability and driving user engagement across hundreds of touchpoints',
        'Contributed to Tesla Design System; partnered cross-functionally with Product, Engineering, and Analytics',
      ],
      'Accurate Background': [
        'Created compliance-focused error-detection tool that streamlined QA review, improving operational efficiency',
        'Enhanced background check experience with improved information architecture, driving user activation and task completion',
        'Collaborated cross-functionally with overseas engineering teams to align on requirements and deliver platform improvements',
      ],
    },
  },

  spotify: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about consumer product design, visual craft, and turning complexity into clarity.',
    skills: {
      design: ['Consumer Product Design', 'Native Mobile (iOS/Android)', 'Visual Design', 'Design Systems', 'Interaction Design', 'Design Craft'],
      development: ['React/HTML/CSS/JS', 'AI-Enabled Prototyping', 'AI-Assisted Development', 'Front-End Development'],
      strategy: ['Cross-Functional Partnership', 'Brand-to-Product Translation', 'Inclusive Design', 'Accessibility (WCAG)'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead end-to-end product design as sole designer across data annotation platform, native mobile labeling app, and internal tools, serving five distinct user types',
        'Architect scalable design patterns and component library, ensuring consistency across platforms while maintaining WCAG-compliant accessibility',
        'Translate brand direction into cohesive product experiences across platform, marketing site, and learning systems',
        'Design and ship production UI using AI-enabled tools, raising the bar on craft and interaction quality',
      ],
      'Tesla': [
        'Led redesign of native iOS/Android in-store advisor app used by sales advisors for lead generation, test drive scheduling, and customer follow-up',
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% through intuitive conversational UX',
        'Led global launch of responsive product pages for Tesla.com, simplifying complex product catalogs into engaging, scalable user journeys',
        'Contributed to Tesla Design System with detailed component guidelines; partnered cross-functionally with Engineering and Product',
      ],
      'INDI EV': [
        'Led design of the in-vehicle interface for INDI EV\'s debut electric car, translating brand creative direction into cohesive product experience',
        'Delivered high-fidelity prototype with key driver flows and vehicle control features for LA Auto Show debut',
      ],
      'Catalia Health': [
        'Led team of 4 designing a HIPAA-compliant community app for heart failure patients, prioritizing accessibility and inclusive design',
        'Conducted user research with 42 participants; delivered high-fidelity prototype tested with chronically ill patients',
      ],
    },
  },

  waymo: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about design systems architecture, HMI design, and making complex technology accessible.',
    skills: {
      design: ['Design Systems Architecture', 'HMI Design', 'Product Design', 'Systems Thinking', 'Typography', 'Component Libraries'],
      development: ['React/HTML/CSS/JS', 'Figma (Variables, Auto-layout, Variants)', 'AI-Assisted Development', 'Front-End Development'],
      strategy: ['Cross-Functional Leadership', 'Design Documentation', 'Stakeholder Alignment', 'WCAG Compliance'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Architect and maintain scalable design system with component library and design tokens (color, typography, spacing), ensuring WCAG-compliant accessibility',
        'Lead end-to-end product design as sole designer for data labeling platform powering autonomous vehicle development, serving five distinct user types',
        'Design and ship production UI in React using AI-assisted development workflows, reducing technical debt through systematic design',
        'Drive cross-functional alignment with Engineering and Data Science leadership on roadmap and technical decisions',
      ],
      'Tesla': [
        'Contributed to Tesla Design System with detailed component guidelines, design tokens, and documentation for automotive and web platforms',
        'Led global launch of responsive product and feature pages for Tesla.com; used storytelling to drive alignment across stakeholders',
        'Led design of mega menu across Tesla.com, improving content discoverability and navigation at scale',
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% after launch',
      ],
      'INDI EV': [
        'Led design of the in-vehicle interface for INDI EV\'s debut electric car, establishing UI and design system from scratch',
        'Delivered high-fidelity prototype with key driver flows and vehicle control features for LA Auto Show debut',
      ],
    },
  },

  vercel: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about developer tooling, design systems, and shipping remarkable software interfaces.',
    skills: {
      design: ['Product Design', 'Design Systems', 'Visual Design', 'UI Design', 'Interaction Design', 'System-Based Solutions'],
      development: ['React/HTML/CSS/JS', 'Claude Code', 'Git/GitHub', 'AI-Assisted Development', 'Front-End Development'],
      strategy: ['Developer Tooling', 'Technical Product Design', 'Cross-Functional Collaboration', 'Design Documentation'],
      tools: ['Figma', 'Vercel', 'GitHub', 'Claude Code', 'Cursor', 'v0'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead all design as sole designer for technical data annotation platform, shipping production UI in React using Claude Code',
        'Know when to use the design system, when to break it, and when to evolve it based on product needs',
        'Architect scalable component library with design tokens, maintaining consistency while shipping quickly',
        'Drive design strategy: author PRDs, collaborate with Engineering on technical decisions, and guide implementation',
      ],
      'Tesla': [
        'Contributed to Tesla Design System with component guidelines and design tokens; knew when to follow patterns vs. evolve them',
        'Led global launch of responsive product pages for Tesla.com, collaborating closely with Engineering to ship quickly',
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% after launch',
        'Led redesign of native iOS/Android in-store advisor app; guided implementation with Engineering team',
      ],
      'Accurate Background': [
        'Designed system-based solutions for complex compliance workflows in technical B2B infrastructure',
        'Enhanced background check experience with improved information architecture and streamlined verification flows',
        'Collaborated cross-functionally with overseas engineering teams to align on requirements and ship platform improvements',
      ],
    },
  },

  classpass: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about consumer product design, native mobile experiences, and turning complexity into joyful simplicity.',
    skills: {
      design: ['Consumer Product Design', 'Native Mobile (iOS/Android)', 'Design Craft', 'Systems Thinking', 'Interaction Design', 'End-to-End Product Design'],
      development: ['React/HTML/CSS/JS', 'AI-Assisted Development', 'Rapid Prototyping', 'Front-End Development'],
      strategy: ['Product Thinking', 'Cross-Functional Leadership', 'Lifecycle Design', 'User Research'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    titleOverrides: {
      'Avala AI': 'Senior UX/UI Designer',
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead end-to-end product design as sole designer across platform, native mobile labeling app, and learning systems, serving five distinct user types with unique needs',
        'Own design strategy and execution: shape vision, define flows, and ship quality across the full product lifecycle',
        'Design and ship production UI using AI-assisted workflows, maintaining design craft and a scalable component library',
        'Drive cross-functional alignment with Engineering and Operations leadership on roadmap and product direction',
      ],
      'Tesla': [
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% by removing friction and surfacing value at key moments',
        'Led redesign of native iOS/Android in-store advisor app for lead generation, scheduling, and customer engagement',
        'Led global launch of responsive product pages for Tesla.com, optimizing discovery and activation across the customer journey',
        'Contributed to Tesla Design System with component guidelines; partnered cross-functionally with Product, Engineering, and Marketing',
      ],
      'Accurate Background': [
        'Enhanced end-to-end background check experience with improved information architecture and streamlined verification flows',
        'Created compliance-focused tool that streamlined QA review, improving operational efficiency',
        'Collaborated cross-functionally with overseas engineering teams to align on requirements and ship platform improvements',
      ],
      'Catalia Health': [
        'Led team of 4 designing an accessible, HIPAA-compliant community app for heart failure patients, prioritizing trust and engagement',
        'Conducted user research with 42 participants; delivered high-fidelity prototype tested with real users',
      ],
    },
  },

  webflow: {
    tagline: 'Senior UX/UI designer, MHCI+D, based in Los Angeles with 7+ years of experience. Passionate about data visualization, systems design, and turning complex information into interfaces that feel obvious.',
    skills: {
      design: ['Data Visualization', 'Design Systems', 'Systems Thinking', 'Interaction Design', 'Visual Design', 'End-to-End Product Design'],
      development: ['React/HTML/CSS/JS', 'Figma (Variables, Auto-layout, Variants)', 'AI Tools', 'High-Fidelity Prototyping'],
      strategy: ['Cross-Functional Partnership', 'Product Strategy', 'Design Documentation', 'Requirements Gathering'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    titleOverrides: {
      'Avala AI': 'Senior Product Designer',
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead end-to-end product design as sole designer for data annotation platform, designing complex data workflows for LiDAR, 3D spatial data, and multi-frame sequences',
        'Design in Figma and develop production UI using Claude Code, including data management, visualization, and annotation tools, internal dashboards, and marketing website',
        'Build and maintain component library with design tokens, scales, and responsive behavior across workspace- and project-level contexts',
        'Partner with Engineering and Operations leadership to align on workflows and requirements before design begins',
      ],
      'Tesla': [
        'Led design of AI chatbot with recommendation flows, boosting sales lead conversion rates by 120% through clear signals and trust-building patterns',
        'Contributed to Tesla Design System with component library, design tokens, and documentation for analytics and web platforms',
        'Led global launch of responsive product pages for Tesla.com, translating complex product data into clear stories across Energy and Investor Relations',
        'Partnered cross-functionally with Product, Engineering, and Analytics to define metrics and measure design impact',
      ],
      'Accurate Background': [
        'Designed data-heavy compliance workflows, translating complex background check data into clear, actionable interfaces',
        'Created error-detection tool that surfaced data inconsistencies, streamlining QA review and improving operational efficiency',
        'Collaborated cross-functionally with overseas engineering teams to align on data requirements and ship platform improvements',
      ],
    },
  },

  'webflow-staff': {
    tagline: 'Staff Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience. I distill complex, technical concepts into simple, intuitive experiences—and thrive in ambiguity, remote environments, and high-growth teams.',
    skills: {
      design: ['Product Design', 'Design Vision & Strategy', 'Design Systems', 'Content Management Platforms', 'Interaction Design', 'Accessibility (WCAG)'],
      development: ['React/HTML/CSS/JS', 'Web Standards', 'AI-Assisted Development', 'High-Fidelity Prototyping'],
      strategy: ['Cross-Functional Alignment', 'Customer Engagement', 'Design Leadership', 'Thought Leadership', 'Mentorship'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
    },
    titleOverrides: {
      'Avala AI': 'Staff Product Designer',
    },
    experienceOverrides: {
      'Avala AI': [
        'Define, design, and launch new product capabilities as sole designer, seamlessly integrating features across platform, mobile app, and internal tools',
        'Distill complex technical concepts—LiDAR, 3D spatial data, multi-frame sequences—into simple, intuitive annotation workflows that drive measurable efficiency gains',
        'Drive alignment across Engineering and Operations leadership on design vision, product strategy, and technical dependencies',
        'Elevate design craft by building scalable component library with design tokens, maintaining WCAG-compliant accessibility standards',
        'Stay fluent in emerging AI technologies, shipping production UI using Claude Code and AI-assisted development workflows',
      ],
      'Tesla': [
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% by distilling complex product information into clear, actionable conversations',
        'Contributed to Tesla Design System as thought leader for component guidelines, design tokens, and cross-platform documentation',
        'Led global launch of responsive product pages for Tesla.com, untangling complex content dependencies across Energy, Support, and Investor Relations',
        'Drove alignment across Product, Engineering, and Analytics stakeholders through clear written, verbal, and visual communication',
      ],
      'Accurate Background': [
        'Designed data-heavy compliance workflows for professional users, translating complex background check data into clear, actionable interfaces',
        'Created error-detection tool that surfaced data inconsistencies, demonstrating bias towards action and attention to detail',
        'Collaborated cross-functionally with overseas engineering teams in a remote environment to align on requirements and ship platform improvements',
      ],
      'INDI EV': [
        'Defined design vision and strategy for in-vehicle interface (HMI) of debut electric car, establishing UI and design system from scratch',
        'Delivered high-fidelity prototype with key driver flows and vehicle control features for LA Auto Show debut',
      ],
    },
  },

  figma: {
    tagline: 'Senior Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience. Systems thinker and prototyper passionate about design systems, AI tooling, and turning ambiguity into clarity for complex creative workflows.',
    skills: {
      design: ['Design Systems', 'Interaction Design', 'Visual Craft', 'Prototyping', 'Systems Thinking', 'Canvas-Based Interfaces'],
      development: ['React/HTML/CSS/JS', 'AI-Assisted Development', 'High-Fidelity Prototyping', 'Front-End Development'],
      strategy: ['Cross-Functional Collaboration', 'Discovery to Launch', 'Design Storytelling', 'Design Critiques'],
      tools: ['Figma (Auto Layout, Variables, Components)', 'GitHub', 'Claude Code', 'Warp', 'Vercel'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead all design as sole designer for canvas-based data annotation platform, turning ambiguity into clarity for five distinct user types with complex workflows',
        'Design and ship production UI in React using AI-assisted development workflows, iterating rapidly from discovery through launch',
        'Architect scalable design system with component library, design tokens, and advanced Figma patterns (Variables, Auto Layout, Variants)',
        'Create and iterate on flows, prototypes, and high-fidelity visuals for complex annotation tools handling LiDAR and 3D spatial data',
        'Collaborate cross-functionally with engineering and operations leadership to shape product strategy and decision-making',
      ],
      'Tesla': [
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% through iterative prototyping and interaction design refinement',
        'Contributed to Tesla Design System with component guidelines, design tokens, and systematic patterns across platforms',
        'Led global launch of responsive product pages for Tesla.com, delivering clear storytelling around product needs and opportunities',
        'Created high-fidelity flows and prototypes; provided thoughtful design critique feedback across cross-functional teams',
        'Led redesign of native iOS/Android in-store advisor app, driving design process from discovery through launch',
      ],
      'INDI EV': [
        'Led 0-1 design of in-vehicle interface for INDI EV\'s debut electric car, establishing UI and design system from scratch',
        'Delivered high-fidelity prototype with key driver flows for LA Auto Show debut, balancing user needs and technical constraints',
      ],
      'Catalia Health': [
        'Led team of 4 designing an accessible community app for heart failure patients, guiding decision-making with user-centered research',
        'Conducted research with 42 participants; delivered high-fidelity prototype demonstrating key feature flows',
      ],
    },
  },

  netflix: {
    tagline: 'Senior Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience designing enterprise software and horizontal solutions. Passionate about navigating ambiguity, crafting systematic solutions, and collaborating with technical teams.',
    skills: {
      design: ['Enterprise Product Design', 'Interaction Design', 'Visual Design', 'Prototyping', 'Systems Mapping', 'Workflow Design'],
      development: ['React/HTML/CSS/JS', 'Technical Collaboration', 'AI-Assisted Development', 'Front-End Development'],
      strategy: ['Cross-Functional Partnership', 'Human-Centered Design', 'Product Strategy', 'Stakeholder Communication'],
      tools: ['Figma (Auto Layout, Variables, DevMode)', 'GitHub', 'Claude Code', 'Jira', 'Confluence'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead end-to-end design as sole designer for enterprise data management platform, designing horizontal solutions for five distinct user types',
        'Navigate ambiguity and drive clarity by mapping systems, defining workflows, and crafting solutions that connect user needs and business goals',
        'Partner with engineering leadership to ship production UI in React, demonstrating ability to think technically and collaborate with engineers',
        'Facilitate collaborative work sessions with operations and engineering stakeholders to align on product strategy',
      ],
      'Tesla': [
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% through iterative prototyping and human-centered design',
        'Contributed to Tesla Design System with systematic solutions: component guidelines, design tokens, and cross-platform patterns',
        'Designed enterprise apps for Energy Installers and Powerwall Parts Store, creating end-to-end experiences for B2B users',
        'Led redesign of native iOS/Android in-store advisor app, working across all stages from research to implementation',
      ],
      'Accurate Background': [
        'Designed horizontal, foundational solutions for enterprise platform serving thousands of global users across diverse business verticals',
        'Created compliance-focused error-detection tool that simplified complexity underneath the UI layer, streamlining QA workflows',
        'Collaborated cross-functionally with overseas engineering teams, demonstrating exceptional communication across time zones',
      ],
      'Catalia Health': [
        'Led team of 4 designing accessible healthcare app, conducting generative user research with 42 participants',
        'Delivered high-fidelity prototype demonstrating thoughtful interaction design and human-centered approach',
      ],
    },
  },

  'netflix-commerce': {
    tagline: 'Senior Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience. Systems thinker passionate about design systems, consumer experiences across mobile and web, and driving meaningful business impact.',
    skills: {
      design: ['Design Systems', 'Interaction Design', 'Visual Design', 'Prototyping', 'Multi-Platform Design (Mobile/Web)', 'Pixel-Perfect Mockups'],
      development: ['React/HTML/CSS/JS', 'AI-Assisted Development', 'Front-End Development', 'Implementation Support'],
      strategy: ['Systems Thinking', 'Human-Centered Design', 'Storytelling', 'Cross-Functional Partnership'],
      tools: ['Figma (Auto Layout, Variables, Components)', 'GitHub', 'Claude Code', 'Jira', 'Confluence'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead end-to-end design as sole designer, creating design system components and guidelines that scale across mobile and web platforms',
        'Employ storytelling to present UX strategy and create shared understanding with engineering and operations stakeholders',
        'Navigate ambiguity and drive clarity, breaking down opportunities into actionable roadmaps that connect user needs and business goals',
        'Create pixel-perfect mockups and prototypes, driving human-centered design process from concept to launch',
      ],
      'Tesla': [
        'Led design of AI chatbot that boosted sales lead conversion rates by 120%, driving meaningful impact to the business',
        'Contributed to Tesla Design System with design guidelines, component patterns, and tokens across multiple platforms',
        'Led global launch of responsive product pages for Tesla.com, creating emotionally compelling end-to-end experiences for 220M+ visitors',
        'Led redesign of native iOS/Android in-store advisor app, demonstrating ability to work across native and web platforms',
      ],
      'Accurate Background': [
        'Designed consumer-facing experiences for background check platform, crafting systematic solutions across web and mobile',
        'Created design guidelines and aligned multiple stakeholders on interaction patterns and visual design standards',
        'Partnered with PMs and engineers to launch features that drove meaningful impact to the business',
      ],
      'Catalia Health': [
        'Led team of 4 designing accessible healthcare app, driving human-centered design process with 42 research participants',
        'Delivered pixel-perfect prototypes demonstrating extraordinary craft in interaction and visual design',
      ],
    },
  },

  'doordash-drive': {
    tagline: 'Senior Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience. Craftsperson passionate about 0 to 1 product design, driving clarity in ambiguous spaces, and sweating the details.',
    skills: {
      design: ['0 to 1 Product Design', 'Visual Design', 'Interaction Design', 'Prototyping', 'High-Fidelity Visuals', 'Design Craft'],
      development: ['React/HTML/CSS/JS', 'AI-Assisted Development', 'Front-End Development', 'Rapid Iteration'],
      strategy: ['Product Strategy & Vision', 'Cross-Functional Collaboration', 'End-to-End Ownership', 'Design Sprints'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Jira', 'Confluence', 'Warp'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Own product areas end to end as sole designer, defining vision and strategy for 0 to 1 product in fast-growing startup',
        'Drive clarity in ambiguous spaces, contributing to product strategy and crafting visions that connect user needs and business goals',
        'Create, collaborate, and iterate on flows, prototypes, and high-fidelity visuals for five distinct user types',
        'Work cross-functionally with engineering and operations to build and ship designs that bridge physical and digital worlds',
      ],
      'Tesla': [
        'Led design of AI chatbot, boosting sales lead conversion rates by 120% through craft and attention to detail',
        'Designed Energy Installers app for tracking Powerwall installation arrivals, serving both customers and installers with real-time logistics',
        'Led 0 to 1 redesign of native iOS/Android in-store advisor app for scheduling test drives, lead generation, and customer follow-up',
        'Led global launch of responsive product pages for Tesla.com, iterating on flows and prototypes with cross-functional partners',
      ],
      'INDI EV': [
        'Led 0 to 1 design of in-vehicle interface for debut electric car, defining vision and strategy from scratch',
        'Delivered high-fidelity prototype with key driver flows for LA Auto Show debut, sweating every detail',
      ],
      'Catalia Health': [
        'Led team of 4 in 0 to 1 design of accessible healthcare app, driving clarity through user research with 42 participants',
        'Created high-fidelity visuals and prototypes demonstrating passion for visual design and craft',
      ],
    },
  },

  stubhub: {
    tagline: 'Senior Product Designer, MHCI+D, based in Los Angeles with 7+ years of experience. Design systems specialist passionate about building scalable component libraries, documentation, and AI-powered design patterns.',
    skills: {
      design: ['Design Systems', 'Component Libraries', 'Interaction Design', 'Visual Design', 'Documentation', 'Multi-Platform Design (Web/Mobile)'],
      development: ['Figma (Variables, Components, Auto Layout)', 'React/HTML/CSS/JS', 'AI-Assisted Development', 'Design Tokens'],
      strategy: ['Design Ops', 'Cross-Functional Collaboration', 'Stakeholder Alignment', 'Design Guidelines'],
      tools: ['Figma', 'GitHub', 'Claude Code', 'Jira', 'Confluence', 'Storybook'],
    },
    experienceOverrides: {
      'Avala AI': [
        'Build and maintain scalable design system with component library, design tokens, and documentation spanning web platform, native mobile app, and internal tools',
        'Ship production React components and design tokens using Claude Code, turning design patterns into reusable skills for design system automation',
        'Design complex annotation workflows for LiDAR, 3D spatial data, and multi-frame sequences; author PRDs and shape product roadmap',
        'Own brand design and visual identity across investor decks, trade shows, and marketing site',
      ],
      'Tesla': [
        'Contributed to Tesla Design System in Figma with component guidelines and documentation across web and native platforms',
        'Led design of mega menu across Tesla.com, creating scalable navigation components for content discoverability',
        'Led design of AI chatbot, consolidating chat components and boosting sales lead conversion rates by 120%',
        'Led responsive product pages for Tesla.com and native iOS/Android apps including in-store advisor, Energy Installers, and Powerwall Parts Store',
      ],
      'Accurate Background': [
        'Established design patterns and guidelines for enterprise platform, improving consistency across product surface areas',
        'Documented reusable components and interaction patterns for engineering implementation',
        'Partnered with overseas engineering teams to ensure design system adoption and quality',
      ],
      'INDI EV': [
        'Established UI and design system from scratch for in-vehicle interface, creating foundational component library',
        'Delivered design documentation and specifications for LA Auto Show debut prototype',
      ],
    },
  },

  'apple-music': {
    title: 'Senior UI Designer',
    tagline: 'Senior UI Designer, MHCI+D, based in Los Angeles with 7+ years of experience. Classically trained pianist (Certificate of Merit Level 10) and music producer (Ableton) passionate about elegant interfaces, workflow-driven experiences, and crafting nuanced visual solutions for creative professionals.',
    skills: {
      design: ['UI Design (iOS/macOS)', 'Interaction Design', 'Visual Design', 'Workflow Design', 'Prototyping', 'Design Systems'],
      development: ['High-Fidelity Prototyping', 'Visual Specifications', 'Design Documentation', 'Front-End Development'],
      strategy: ['Cross-Functional Collaboration', 'Design Presentations', 'Iterative Design Process', 'Design Critique'],
      tools: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Ableton Live', 'Keynote', 'Principle'],
    },
    titleOverrides: {
      'Avala AI': 'Senior UX/UI Designer',
      'Tesla': 'UX/UI Designer, Discovery',
      'Notetracks': 'UX/UI Designer, Music Collaboration',
      'INDI EV': 'UX/UI Designer, In-Vehicle Infotainment',
    },
    experienceOverrides: {
      'Avala AI': [
        'Lead UI design as sole designer for workflow-driven data management, visualization, and annotation platform, distilling intricate design challenges into sophisticated, intuitive solutions',
        'Ship production UI code using AI-assisted development workflows, creating detailed visual specifications and design documentation for engineering collaboration',
        'Design complex, deep workflows for professional users handling LiDAR, 3D spatial data, and multi-frame sequences with attention to layout, typography, and behavior',
        'Collaborate cross-functionally with engineering and product leadership to develop innovative features through thoughtful interaction design',
        'Build and maintain design system with component library, ensuring consistency, quality, and attention to detail across all product surfaces',
      ],
      'Tesla': [
        'Designed native iOS and Android applications including in-store advisor app for scheduling and customer engagement, demonstrating multi-platform UI expertise',
        'Led design of AI chatbot with nuanced interaction design, boosting sales lead conversion rates by 120% through elegant conversational UI',
        'Contributed to Tesla Design System with component guidelines and visual specifications across web and native platforms',
        'Led global launch of responsive product pages for Tesla.com, balancing visual design craft with tight deadlines',
      ],
      'Notetracks': [
        'Designed UI for collaborative cloud-based audio arranging and note-taking web app used by music producers and audio professionals',
        'Designed waveform visualization, timeline scrubbing, track layering and mixing controls, and timestamped annotation features',
      ],
      'INDI EV': [
        'Led UI design of in-vehicle interface for debut electric car, establishing visual language and interaction patterns from scratch',
        'Delivered high-fidelity prototype with refined typography, layout, and motion behavior for LA Auto Show debut',
      ],
    },
    // Exclude Accurate Background and Catalia Health for this template - Notetracks is more relevant
    hideJobs: ['Accurate Background', 'Catalia Health'],
  },
}

// Get resume data for a specific template
export const getResumeDataForTemplate = (templateId = 'default') => {
  const overrides = resumeTemplateOverrides[templateId]

  return {
    personalInfo: {
      ...personalInfo,
      title: overrides?.title || personalInfo.title,
      tagline: overrides?.tagline || personalInfo.tagline,
    },
    skills: overrides?.skills || printSkills,
    education,
    languages,
  }
}
