# Project Notes

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
