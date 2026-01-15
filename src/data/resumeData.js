/**
 * Shared resume data - single source of truth
 * Used by both ResumePage and ResumePrintPage
 */

export const personalInfo = {
  name: 'Grace Guo',
  title: 'Senior UX/UI Designer',
  credentials: 'MHCI+D',
  tagline: 'Senior UX/UI designer, MHCID, based in Los Angeles with 7+ years of experience. Passionate about healthcare, sustainability, and emerging tech.',
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
    title: 'Senior UX/UI Designer',
    dates: 'Jun 2024 – Present',
    bullets: [
      'Lead all design as sole designer across AI dataset platform, marketing site, internal tools, learning systems, and annotator app',
      'Author PRDs and shape product roadmap in collaboration with engineering and operations leadership',
      'Rapidly design, develop, and ship production code using agentic AI workflows—continuously updating UI component library and shipping platform iterations',
      'Design complex annotation workflows for LiDAR, 3D spatial data, and multi-frame sequences',
      'Own brand design across investor decks, trade shows, merchandise, and collateral',
    ],
    // For print version - more concise if needed
    printBullets: null, // Use main bullets if null
  },
  {
    company: 'Tesla',
    location: 'Hawthorne, CA',
    logo: '/assets/resume/tesla-logo.png',
    title: 'UX/UI Designer',
    dates: 'Nov 2021 – Apr 2024',
    bullets: [
      'Led global launch of responsive feature pages for Tesla.com, enhancing user experience across Energy, Support, and Investor Relations',
      'Designed and implemented mega menu and AI chatbot for Tesla.com, achieving 120% sales lead conversion increase',
      'Redesigned internal and enterprise apps, optimizing workflows for in-store advisors and energy installers',
      'Developed components and guidelines for Figma library and Tesla Design System through cross-functional collaboration',
    ],
    printBullets: [
      'Led global launch of responsive feature pages for Tesla.com across Energy, Support, and Investor Relations',
      'Designed mega menu and AI chatbot for Tesla.com, achieving 120% sales lead conversion increase',
      'Redesigned internal and enterprise apps for in-store advisors and energy installers',
      'Developed components and guidelines for Figma library and Tesla Design System',
    ],
  },
  {
    company: 'Accurate Background',
    location: 'Irvine, CA',
    logo: '/assets/resume/accurate-logo.png',
    title: 'UX/UI Designer',
    dates: 'May 2018 – Oct 2021',
    bullets: [
      'Created error-detection tool that automatically flagged background check inconsistencies, streamlining QA review',
      'Enhanced background check experience with improved information architecture and streamlined ID verification',
    ],
    printBullets: [
      'Created error-detection tool that automatically flagged background check inconsistencies, streamlining QA review',
      'Enhanced background check experience with improved IA and streamlined ID verification',
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
    showInPrint: true, // Show in print version
  },
  {
    company: 'INDI EV',
    location: 'Los Angeles, CA',
    logo: '/assets/resume/indi-ev-logo.png',
    title: 'UX/UI Designer',
    dates: 'Aug 2020 – Sep 2021',
    bullets: [
      'Established the UI and design system for INDI EV\'s first electric car\'s IVI',
      'Worked with animator to create demo reel shown within vehicle during LA Auto Show',
      'Delivered high-fidelity prototype with key driver flows and vehicle control features',
    ],
    printBullets: [
      'Established the UI and design system for INDI EV\'s first electric car\'s IVI',
      'Worked with animator to create demo reel shown within vehicle during LA Auto Show',
      'Delivered high-fidelity prototype with key driver flows and vehicle control features',
    ],
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
    'Design Systems',
    'Component Libraries',
    'Interaction Design',
    'Visual Design',
    'Information Architecture',
    'Rapid Prototyping',
  ],
  development: [
    'React/HTML/CSS/JS',
    'Agentic AI Workflows',
    'AI-Assisted Development',
    'Front-End Development',
  ],
  strategy: [
    'PRD Writing',
    'Cross-Functional Collaboration',
    'Stakeholder Presentations',
    'User Research',
    'Requirements Gathering',
  ],
  tools: [
    'Figma',
    'GitHub',
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
  design: ['Design Systems', 'Component Libraries', 'Interaction Design', 'Visual Design', 'Information Architecture'],
  development: ['React/HTML/CSS/JS', 'Agentic AI Workflows', 'AI-Assisted Development', 'Front-End Development'],
  strategy: ['PRD Writing', 'Cross-Functional Collaboration', 'User Research', 'Requirements Gathering'],
  tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
}

export const languages = [
  { name: 'English', level: 'Native', proficiency: 100 },
  { name: 'Mandarin (Chinese)', level: 'Proficient', proficiency: 80 },
]

// Helper to get experience for print (filtered and with print-specific bullets)
export const getPrintExperience = () => {
  return experience
    .filter(job => job.showInPrint !== false)
    .map(job => ({
      ...job,
      bullets: job.printBullets || job.bullets,
    }))
}
