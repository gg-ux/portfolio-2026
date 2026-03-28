# Project Notes

## Design System Reference

Full design system docs in private repo: github.com/gg-ux/gracebot

## Accent Colors on Cards

When displaying multiple cards (goals, metrics, features), use brand accent colors in order:

```jsx
import { getColor } from '../../constants/colors'

// Palette order: amethyst → lilac → rose → gold → peridot
const items = [
  { title: 'First', colorKey: 'amethyst' },
  { title: 'Second', colorKey: 'lilac' },
  { title: 'Third', colorKey: 'rose' },
  { title: 'Fourth', colorKey: 'gold' },
  { title: 'Fifth', colorKey: 'peridot' },
]

// Usage in component:
const accentColor = getColor(item.colorKey, isDark)
<div style={{ color: accentColor }}>{item.metric}</div>
<Icon style={{ color: accentColor, opacity: 0.4 }} />
```

Examples: Tesla Chatbot tags, Cuboid Annotator impact cards

## Resume Updates
When Grace asks to update her resume, edit the shared data file:
`src/data/resumeData.js`

This file is the single source of truth - both `/resume` and `/resume-print` pages pull from it.

Key fields:
- `personalInfo` - name, title, email, linkedin
- `experience` - jobs with bullets (use `printBullets` for shorter print versions, `showInPrint: false` to hide from print)
- `education` - degrees and schools
- `skills` - design, development, strategy, tools
- `printSkills` - shorter skills list for print version
- `languages` - with proficiency percentages
