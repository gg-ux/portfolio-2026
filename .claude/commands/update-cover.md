# Update Cover Letter for Template

Optimize the cover letter for a specific job template by analyzing the job description and tailoring content.

## Usage
```
/update-cover <template-id>
```

## Instructions

When the user runs this command with a template ID (e.g., `doordash`, `dropbox`, `waymo`, `spotify`, `calendly`):

1. **Read the current template configuration** from:
   - `src/data/coverLetterData.js` - Check `companyOverrides[templateId]`
   - `src/styles/printTemplates.js` - Get template name

2. **If no job description is provided**, ask the user to paste the job description.

3. **Analyze the job description** for:
   - Role title and team name
   - Company mission and values
   - Key responsibilities
   - Required qualifications
   - Keywords and terminology
   - What makes this role unique

4. **Review the current cover letter** and identify:
   - Is the role title correctly mentioned?
   - Does the opening hook connect to their mission?
   - Are the most relevant experiences highlighted?
   - Are key metrics included (e.g., 120%)?
   - Does it match the preferred structure?

5. **Apply the standard 3-paragraph structure**:
   - **Para 1 (Hook)**: Why this role/company excites you, connect to their mission
   - **Para 2 (Experience dump)**: All relevant experience in one dense paragraph, include metrics
   - **Para 3 (Short close)**: Credentials + excitement for team, no portfolio link (QR code handles it)

6. **Propose optimizations** and apply after user approval.

## Key Principles (from Grace's feedback)

- **Avoid em dashes** - they look AI-written
- **Be specific about Avala AI** - "data annotation platform" or "data labeling platform powering autonomous vehicle development"
- **Don't over-explain** - "five distinct user types" is enough, no need to list them
- **Match the structure** to DoorDash/Dropbox format (hook → experience dump → short close)
- **Include the role title** in the opening (e.g., "Senior Product Designer, Growth role at Calendly")
- **No portfolio link** in text - the QR code already links to graceguo.io
- **Sign-off**: Use "Looking forward to connecting," not "Thank you for your consideration"

## Template-Specific Patterns

- **Growth roles**: Lead with metrics, mention activation/funnels, data-driven approach
- **Design Systems roles**: Emphasize design tokens, component libraries, systematic thinking
- **Consumer roles**: Focus on craft, visual design, turning complexity into clarity
- **Automotive roles**: Show career trajectory toward AV (Tesla → INDI EV → Avala → Waymo)
- **AI roles**: Emphasize AI-assisted development workflows, AI chatbot work
- **Remote-first companies**: Mention appreciation for remote/Virtual First culture

## Experience Highlights by Relevance

- **120% conversion metric**: Perfect for growth, AI, conversion-focused roles
- **Tesla Design System**: Design systems roles
- **Native mobile apps**: Avala labeling app, Tesla advisor app - for mobile roles
- **Catalia Health**: Inclusive design, accessibility, healthcare
- **INDI EV**: Automotive, in-vehicle interfaces
- **Brand work at Avala**: Brand-to-product translation roles
