---
description: Analyze job description and generate optimized resume + cover letter
argument-hint: [paste job description after running]
---

# /jobscan - ATS-Optimized Resume & Cover Letter Generator

Generate an ATS-friendly resume and cover letter tailored to a specific job posting.

## Workflow

1. **Ask for job description** if not provided in the message
2. **Analyze the job posting** thoroughly
3. **Generate optimized resume template** with tailored bullets
4. **Generate matching cover letter** using the 3-paragraph structure
5. **Create or update template** in the codebase
6. **Provide summary** of keyword matches and optimization scores

## Step 1: Job Description Analysis

Extract and analyze:

### Role Details
- Job title (exact wording)
- Company name
- Team/department
- Location/remote status
- Level (IC, Senior, Staff, Lead, Principal)

### Keywords & Skills (for ATS matching)
- **Hard skills**: Specific tools, technologies, methods (e.g., "Figma", "design systems", "prototyping")
- **Soft skills**: Collaboration, leadership, communication patterns
- **Industry terms**: Domain-specific language (e.g., "growth design", "HMI", "accessibility")
- **Action verbs**: The verbs they use (e.g., "drive", "lead", "ship", "collaborate")
- **Metrics/outcomes**: What they measure (e.g., "conversion", "engagement", "retention")

### Requirements Mapping
- Years of experience required
- Education requirements
- Must-have vs nice-to-have skills
- Portfolio/work sample requirements

## Step 2: ATS Optimization Rules (Jobscan Best Practices)

Apply these rules to ensure maximum ATS compatibility:

### Content Rules
1. **Keyword density**: Include top 10-15 keywords from job description naturally throughout resume
2. **Exact match keywords**: Use their exact phrasing where it rings true (e.g., if they say "cross-functional collaboration", use that phrase)
3. **Skills section alignment**: Reorder skills to prioritize exact matches from job posting
4. **Quantified achievements**: Every bullet should have a metric or outcome where possible
5. **Action verb variety**: Start bullets with strong action verbs that match their language

### Formatting Rules (already implemented in ATS format)
1. **Standard section headings**: Experience, Skills, Education (not creative alternatives)
2. **Reverse chronological order**: Most recent first
3. **Consistent date format**: "Month Year - Month Year" or "Month Year - Present"
4. **No tables, columns, or text boxes** in ATS format
5. **No headers/footers** in ATS format
6. **Contact info in body** not header (ATS format handles this)

### What NOT to Do
1. **Never fabricate experience** - only use language creatively within truth
2. **Never add skills not demonstrated** - can't claim Tableau if never used it
3. **Never inflate metrics** - 120% is 120%, not "over 100%"
4. **Never remove core experience** - adapt framing, don't delete jobs

## Step 3: Resume Generation

### Template ID Convention
Use lowercase company name with hyphens: `doordash`, `waymo`, `spotify-growth`, `webflow-staff`

### Tagline Optimization
Create a tagline that:
- Mirrors the job title language
- Includes 2-3 top keywords naturally
- Mentions years of experience
- Connects to company mission/values
- Stays under 30 words

### Skills Optimization
Reorder `skills` object categories to:
1. Put their top required skills first in each category
2. Add relevant keywords they mention (if Grace has that skill)
3. Remove less relevant skills to make room for matches
4. Keep 5-6 skills per category max for readability

### Experience Bullets Optimization
For each relevant job, create `experienceOverrides`:
1. Lead with bullets that match their top requirements
2. Incorporate their exact keywords where truthful
3. Add metrics to bullets that lacked them
4. Reframe accomplishments to match their outcomes language
5. Keep bullets concise (under 25 words ideal)

### Experience Relevance by Company Type

| Company Type | Lead With | Emphasize |
|--------------|-----------|-----------|
| Growth/Activation | Chatbot 120% metric, conversion, funnels | Data-driven, metrics, activation |
| Design Systems | Tesla Design System, component libraries | Tokens, documentation, scalability |
| Consumer Apps | Native mobile, end-to-end product design | Craft, visual design, user delight |
| Automotive/AV | Tesla, INDI EV, Avala AV labeling | HMI, in-vehicle, safety-critical |
| AI/ML Products | AI chatbot, AI-assisted development, Avala | AI workflows, complex data |
| Enterprise/B2B | Accurate Background, Tesla enterprise apps | Compliance, complex workflows |
| Remote-First | Avala (remote), Notetracks (remote) | Async collaboration, documentation |

## Step 4: Cover Letter Generation

### 3-Paragraph Structure (Proven Format)

**Paragraph 1 - Hook (3-4 sentences)**
- Open with why this specific role at this company excites you
- Connect to their mission/values authentically
- Mention the exact role title
- Show you understand what they do

**Paragraph 2 - Experience Dump (5-7 sentences)**
- Dense paragraph with ALL relevant experience
- Include specific metrics (120% conversion)
- Name-drop companies strategically (Tesla, Avala AI)
- Use their keywords naturally
- Show progression/growth
- End with current capabilities

**Paragraph 3 - Short Close (2-3 sentences)**
- Reference MHCI+D credential if relevant
- Express genuine excitement for the team
- Sign off: "Looking forward to connecting,"
- NO portfolio link (QR code handles it)

### Cover Letter Anti-Patterns
- NO em dashes (looks AI-written)
- NO "I believe I would be a great fit"
- NO listing skills without context
- NO generic opener ("I am writing to apply...")
- NO "Thank you for your consideration"
- NO portfolio URL in text

## Step 5: Implementation

After analysis, update these files:

1. **`src/data/resumeData.js`**
   - Add new entry to `resumeTemplateOverrides`
   - Include: tagline, skills, titleOverrides (if needed), experienceOverrides

2. **`src/data/coverLetterData.js`**
   - Add new entry to `companyOverrides`
   - Include: recipient (if known), content (greeting, body, signoff)

3. **`src/styles/printTemplates.js`** (optional)
   - Add template colors if company has strong brand colors

## Step 6: Summary Output

After generating, provide:

### Keyword Match Report
```
Top Keywords from JD:
1. [keyword] - MATCHED in [section]
2. [keyword] - MATCHED in [section]
3. [keyword] - ADDED to [section]
4. [keyword] - NOT APPLICABLE (Grace doesn't have this skill)
...
```

### Optimization Score
- Keywords matched: X/Y
- Skills aligned: X/Y
- Experience relevance: High/Medium/Low per job
- ATS compatibility: Checklist items passed

### Preview Links
- Resume: http://localhost:5173/print?tab=resume&template=[id]&format=ats
- Cover Letter: http://localhost:5173/print?tab=cover-letter&template=[id]

## Grace's Actual Experience (Source of Truth)

### Companies & Roles
- **Avala AI** (Jun 2024-Present): Senior UX/UI Designer, sole designer, data annotation platform, AI/AV
- **Tesla** (Nov 2021-Apr 2024): UX/UI Designer, Tesla.com, AI chatbot (120% lift), native apps, design system
- **Accurate Background** (May 2018-Oct 2021): UX/UI Designer, compliance tools, B2B enterprise
- **INDI EV** (Aug 2020-Sep 2021): UX/UI Designer, in-vehicle HMI, LA Auto Show debut
- **Notetracks** (Nov 2019-Jan 2021): UX/UI Designer, audio collaboration web app
- **Catalia Health** (Apr 2019-Sep 2019): UX/UI Designer & Researcher, HIPAA-compliant healthcare app

### Key Metrics
- AI chatbot: 120% conversion rate lift
- Catalia Health: 42 research participants
- Avala: 5 distinct user types served

### Skills Grace Actually Has
- Design: Product Design, Design Systems, Native Mobile (iOS/Android), Interaction Design, Visual Design, IA, Accessibility (WCAG), Rapid Prototyping
- Development: React/HTML/CSS/JS, AI-Assisted Development (Claude Code), Front-End Development
- Strategy: 0-1 Product Design, PRD Writing, Cross-Functional Collaboration, Stakeholder Storytelling, User Research
- Tools: Figma, GitHub, Vercel, Claude Code, Warp, Midjourney, Adobe Creative Suite, Jira, Confluence

### Skills Grace Does NOT Have (Don't Claim)
- Tableau, Looker, data analytics tools
- Motion design/After Effects expertise
- Backend development
- User research as primary role (only supporting)
- People management/direct reports

## Creative Reframing (Where Language Flexibility Applies)

These are truthful reframings Grace has approved:

| Original | Can Become (if JD uses this language) |
|----------|---------------------------------------|
| "data annotation platform" | "data labeling platform powering autonomous vehicle development" |
| "AI-assisted development" | "AI-enabled prototyping", "agentic AI workflows" |
| "cross-functional collaboration" | "cross-functional partnership", "stakeholder alignment" |
| "design system contributions" | "design systems architecture", "systematic design" |
| "native mobile app" | "iOS/Android app", "mobile labeling experience" |
| "INDI EV HMI" | "in-vehicle interface", "automotive UI" |
| "Tesla Energy pages" | "product pages across Energy, Support, Investor Relations" |
