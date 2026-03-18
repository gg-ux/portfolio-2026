# Update Resume for Template

Optimize the resume for a specific job template by analyzing keywords and tailoring content.

## Usage
```
/update-resume <template-id>
```

## Instructions

When the user runs this command with a template ID (e.g., `doordash`, `dropbox`, `waymo`, `spotify`, `calendly`):

1. **Read the current template configuration** from:
   - `src/data/resumeData.js` - Check `resumeTemplateOverrides[templateId]`
   - `src/styles/printTemplates.js` - Get template colors

2. **If no job description is provided**, ask the user to paste the job description.

3. **Analyze the job description** for:
   - Key skills and qualifications
   - Industry-specific terminology
   - Required years of experience
   - Technical requirements
   - Soft skills and values
   - Company culture keywords

4. **Review the current resume template** and identify gaps:
   - Missing keywords in tagline
   - Skills that should be added/reordered
   - Experience bullets that could be reframed
   - Metrics that align with the role

5. **Propose optimizations** for:
   - **Tagline**: Align with role's key themes
   - **Skills**: Reorder to prioritize relevant skills, add missing keywords
   - **Experience bullets**: Reframe to emphasize relevant accomplishments
   - Lead with most relevant experience for the role
   - Add metrics where applicable (e.g., "120% increase")

6. **Apply the changes** to `src/data/resumeData.js` after user approval.

## Key Principles (from Grace's feedback)

- Be specific about platforms/tools (not vague like "web platform")
- Lead with design systems work for design systems roles
- Lead with metrics for growth roles
- Mention native mobile experience where applicable (Avala labeling app, Tesla advisor app)
- For automotive roles, emphasize Tesla + INDI EV + Avala (AV data labeling)
- Use "storytelling" for cross-functional collaboration emphasis
- Always include WCAG/accessibility where relevant
- Don't claim experience you don't have (e.g., multiple display sizes at INDI EV)
- Accurate Background can show cross-team collaboration
- Catalia Health shows inclusive/accessible design

## Template-Specific Patterns

- **Growth roles**: Lead with metrics (120% chatbot), activation funnels, data-driven
- **Design Systems roles**: Lead with component libraries, design tokens, scalable patterns
- **Consumer roles**: Emphasize consumer experience, craft, visual design
- **Automotive/HMI**: Emphasize Tesla, INDI EV, Avala AV data labeling
- **AI roles**: Emphasize AI-assisted development, AI chatbot, Avala AI workflows
