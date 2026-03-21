---
description: Sync components/pages with the Gooey design system
argument-hint: [scope: e.g., "whole site", "tables", "colors in ComponentsPage"]
---

# /ds-sync - Design System Synchronization

Audit and sync elements with the established Gooey design system tokens and patterns.

## Purpose

Ensure consistency across the codebase by verifying all components, pages, and patterns follow the documented design system. This includes colors, typography, spacing, and component patterns.

## Workflow

1. **Parse scope** from the argument (e.g., "whole site", "tables", "FoundationPage colors")
2. **Read the design system source of truth**: `/src/constants/tokens.js`
3. **Audit the target scope** for inconsistencies
4. **Report findings** with specific file:line references
5. **Fix inconsistencies** by replacing hardcoded values with design system tokens

## Design System Source of Truth

### File Locations
- **Tokens**: `src/constants/tokens.js` - Single source of truth for all design tokens
- **Colors helper**: `src/constants/colors.js` - Re-exports from tokens.js
- **Typography**: `src/components/Typography.jsx` - Text components
- **UI Components**: `src/components/ui/` - Button, Input, Table, Tag, etc.

### Color Tokens

```javascript
// Brand colors - use getColor('amethyst', isDark)
brand: {
  amethyst: { light: '#5835B0', dark: '#8B6AFF' },
  lilac: { light: '#BF92F0', dark: '#BF92F0' },
  rose: { light: '#D78F8D', dark: '#D78F8D' },
  gold: { light: '#DBA166', dark: '#DBA166' },
  peridot: { light: '#87AA61', dark: '#87AA61' },
}

// Semantic colors - use for functional UI states
semantic: {
  accent: { light: '#5835B0', dark: '#8B6AFF' },
  error: { light: '#DC2626', dark: '#EF4444' },
  success: { light: '#16A34A', dark: '#22C55E' },
}

// Text colors
text: {
  primary: { light: '#1A1A1A', dark: '#FAFAFA' },
  secondary: { light: '#4A4A4A', dark: '#A1A1A1' },
  muted: { light: '#6B6B6B', dark: '#737373' },
}

// Borders
border: {
  light: 'rgba(0, 0, 0, 0.08)',
  dark: 'rgba(255, 255, 255, 0.08)',
}
```

### Common Anti-Patterns to Fix

| Anti-Pattern | Correct Approach |
|--------------|------------------|
| `text-green-500` | Use `colors.semantic.success` with style prop |
| `text-red-500` | Use `colors.semantic.error` with style prop |
| `text-amber-500` | Use warning color or `colors.brand.gold` |
| `text-blue-400` | Use `colors.brand.amethyst` or semantic accent |
| `text-purple-400` | Use `colors.brand.amethyst` or `colors.brand.lilac` |
| `border-white/10` | Use `border-white/[0.06]` or `border-white/[0.08]` |
| `bg-white/5` | Use `bg-white/[0.02]` or `bg-white/[0.03]` |
| Hardcoded hex colors | Import from tokens.js and use getColor() |

### Correct Patterns

```jsx
// Importing tokens
import { colors, getColor } from '../../constants/tokens'
// or
import { getColor } from '../../constants/colors'

// Using semantic colors
const successColor = colors.semantic.success[isDark ? 'dark' : 'light']
<span style={{ color: successColor }}>Passing</span>

// Using brand colors
const accentColor = getColor('amethyst', isDark)
<span style={{ color: accentColor }}>Highlighted</span>

// Border classes (consistent)
const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'

// Background classes (consistent)
const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
const bgHeader = isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]'
```

### Component Patterns

#### Tables
Use the Table component from `src/components/ui/Table.jsx`:
```jsx
import { Table } from '../../components/ui'

<Table headers={['Name', 'Type', 'Usage']} columnWidths={['col-span-3', 'col-span-3', 'col-span-6']}>
  <Table.Row>
    <Table.Cell mono>value</Table.Cell>
    <Table.Cell color="success">passing</Table.Cell>
    <Table.Cell>Description text</Table.Cell>
  </Table.Row>
</Table>
```

#### Muted/Secondary Text
```jsx
// Use theme context
<span className={isDark ? 'text-white/40' : 'text-black/40'}>Muted text</span>
// Or use Text component
<Text color="muted">Muted text</Text>
```

## Audit Checklist

When auditing, check for:

1. **Colors**
   - [ ] No Tailwind color classes for semantic colors (green-500, red-500, amber-500)
   - [ ] All semantic colors use tokens.js values
   - [ ] Brand colors use getColor() helper
   - [ ] Text colors use theme-aware classes or Text component

2. **Borders**
   - [ ] Consistent opacity values (0.06 or 0.08, not 0.1)
   - [ ] Theme-aware border classes

3. **Backgrounds**
   - [ ] Subtle backgrounds use 0.02 or 0.03 opacity
   - [ ] Header backgrounds consistent across tables

4. **Typography**
   - [ ] Using Typography components (Text, Label, Mono, etc.)
   - [ ] Consistent font-mono usage for code/values

5. **Spacing**
   - [ ] Consistent padding in containers (p-6 standard)
   - [ ] Consistent gaps in grids

## Output Format

After auditing, provide:

### Inconsistencies Found
```
File: src/pages/design-system/FoundationPage.jsx
Line 630: `text-green-500` should use colors.semantic.success
Line 632: `text-amber-500` should use colors.brand.gold or warning token
...
```

### Fixes Applied
```
- Replaced X instances of Tailwind color classes with design system tokens
- Updated Y border opacity values to match system
- Migrated Z tables to use Table component
```

## Scope Examples

- `/ds-sync whole site` - Audit entire src/ directory
- `/ds-sync tables` - Audit all table patterns
- `/ds-sync FoundationPage` - Audit specific page
- `/ds-sync colors in ComponentsPage` - Audit colors in specific file
- `/ds-sync semantic colors` - Find all semantic color usage
