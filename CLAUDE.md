# CLAUDE.md - EpilepsyHelper

## Project Overview

**EpilepsyHelper** (https://epilepsyhelper.app) is a React-based Progressive Web App (PWA) designed to help families manage epilepsy. It provides seizure tracking, care plan generation, and access to educational resources. Part of the SUVIMA (Supporting Understanding Via Information for Medical Awareness) ecosystem.

## Tech Stack

- **Framework:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 7.x
- **Routing:** React Router DOM 7.11.0
- **Styling:** Tailwind CSS 3.4.17 (custom epilepsy-themed palette)
- **PWA:** vite-plugin-pwa
- **Data Persistence:** localStorage (no backend)
- **Deployment:** Netlify
- **Email Service:** Resend API (for feedback - to be implemented)

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Color Palette

```javascript
// Primary: Purple/Lavender (epilepsy awareness color)
primary: {
  500: '#8b5cf6',  // Base purple
  600: '#7c3aed',
}

// Accent: Teal (calm, healthcare, trust)
accent: {
  500: '#14b8a6',  // Base teal
  600: '#0d9488',
}

// Emergency: Red
emergency: {
  500: '#ef4444',
  600: '#dc2626',
}

// Warm neutrals (instead of cold grays)
warm: { ... }
```

## Project Structure

```
src/
├── App.tsx                 # Main router configuration
├── main.tsx                # Entry point
├── index.css               # Global styles + Tailwind imports
├── components/
│   ├── home/               # Home page components (TBD)
│   └── layout/
│       └── AppShell.tsx    # Main layout wrapper (sidebar + bottom nav)
├── pages/
│   ├── Home.tsx            # Dashboard with role toggle
│   ├── SeizureDiary.tsx    # Seizure tracking
│   ├── CarePlan.tsx        # Care plan generator
│   ├── CareTeam.tsx        # Healthcare team
│   ├── Emergency.tsx       # Emergency protocols
│   ├── Resources.tsx       # Educational resources
│   ├── Procedures.tsx      # Medical procedure prep
│   ├── About.tsx           # About page
│   └── Privacy.tsx         # Privacy & disclaimer
├── hooks/
│   ├── index.ts
│   └── useLocalStorage.ts  # Custom hook for persisted state
├── types/
│   ├── seizure.ts          # Seizure entry types
│   └── carePlan.ts         # Care plan types
└── data/                   # Static data (TBD)
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Dashboard with role selection, quick actions |
| `/seizure-diary` | SeizureDiary | Seizure tracking and history |
| `/care-plan` | CarePlan | Emergency care plan generator |
| `/care-team` | CareTeam | Healthcare professionals directory |
| `/emergency` | Emergency | Quick emergency reference |
| `/resources` | Resources | Educational materials |
| `/procedures` | Procedures | Medical procedure preparation |
| `/about` | About | About EpilepsyHelper |
| `/privacy` | Privacy | Privacy policy & medical disclaimer |

## Data Persistence

All user data is stored in localStorage using these keys:

| Storage Key | Data Type | Purpose |
|-------------|-----------|---------|
| `epilepsy-app-role` | `'parent-carer' \| 'young-person' \| 'professional'` | User role selection |
| `epilepsy-seizure-diary` | `{ entries: SeizureEntry[] }` | Seizure log |
| `epilepsy-care-plan` | `CarePlan` | Personal care plan |
| `epilepsy-care-team` | `{ teamMembers: TeamMember[] }` | Healthcare contacts |
| `epilepsy-medications` | `{ medications: Medication[] }` | Medication list |
| `epilepsy-emergency-contacts` | `{ contacts: Contact[] }` | Emergency contacts |
| `epilepsy-last-backup` | ISO date string | Last backup date |

The `useLocalStorage` hook handles persistence with automatic JSON serialization.

## Styling Patterns

### Tailwind Classes

```tsx
// Card styling
className="card"  // or card card-hover

// Primary button
className="btn-primary"

// Secondary button  
className="btn-secondary"

// Emergency button
className="btn-emergency"

// Form input
className="form-input"

// Form label
className="form-label"

// Page header pattern
<header className="page-header">
  <Link to="/" className="back-link">
    ← Back to Home
  </Link>
  <h1>Title</h1>
</header>
```

### Responsive Breakpoints

- Mobile-first approach
- Primary breakpoint: `md:` (768px)
- Common patterns:
  - `grid-cols-2 md:grid-cols-4` for tiles
  - `md:grid-cols-2` for form layouts
  - `px-4 md:px-8` for padding
  - `text-2xl md:text-3xl` for headings

## Component Patterns

### Page Structure

Most pages follow this structure:
1. Back navigation link
2. Header with icon + title + subtitle
3. Main content in white cards
4. Optional tips/encouragement section

### Mobile Navigation

`AppShell.tsx` provides different navigation for mobile vs desktop:
- **Desktop:** Sidebar with full navigation
- **Mobile:** Fixed bottom navigation bar with 5 items:
  - Home, Diary, Plan, Team, More
  - "More" button opens slide-up panel with additional pages
- Main content has `pb-20 md:pb-8` to account for bottom nav

## Role System

Three user roles available:
- **Parent/Carer**: Managing care for someone with epilepsy
- **Young Person**: Self-managing epilepsy
- **Professional**: Healthcare providers supporting patients

Role selected on first visit, stored in localStorage, shown different content/tone based on role.

## Development Roadmap

### Phase 1 (Current) - Foundation ✓
- [x] Project setup
- [x] Basic routing
- [x] AppShell layout
- [x] Home page with role selection
- [x] Placeholder pages

### Phase 2 - Seizure Diary
- [ ] Entry form (date, time, type, duration, triggers)
- [ ] Calendar view
- [ ] List view with filters
- [ ] Basic visualization
- [ ] Export to PDF

### Phase 3 - Care Plan Generator
- [ ] Personal information form
- [ ] Emergency medication dosing calculator (NICE/BNF-C)
- [ ] Emergency protocol template
- [ ] PDF export with medical disclaimers
- [ ] Version control

### Phase 4 - Additional Features
- [ ] Care team management
- [ ] Emergency quick reference
- [ ] Educational resources
- [ ] EEG preparation story
- [ ] Backup/restore functionality

### Phase 5 - Polish
- [ ] PWA optimization
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Content review
- [ ] Deployment

## SUVIMA Integration

EpilepsyHelper is designed to complement SUVIMA:
- **SUVIMA**: Educational content about epilepsy
- **EpilepsyHelper**: Practical management tools

Cross-linking strategy:
- Link to SUVIMA from Resources page
- Footer reference to SUVIMA family
- Consistent branding where appropriate
- No duplication of educational content

## Medical Disclaimers

All medical content must include appropriate disclaimers:
- Care plans are templates, not medical advice
- Dosing calculations based on NICE/BNF-C guidelines
- Always consult healthcare professionals
- For emergency: call 999
- Version numbers and last review dates

## Privacy First

- No user accounts
- No backend servers
- All data stored locally
- No tracking or analytics
- User controls their data
- Clear privacy policy

## Key Files for Common Tasks

| Task | Files to Edit |
|------|---------------|
| Add new page | `src/pages/NewPage.tsx`, `src/App.tsx` (add route) |
| Modify navigation | `src/components/layout/AppShell.tsx` |
| Change colors/theme | `tailwind.config.js` |
| Add localStorage data | Create hook in `src/hooks/`, add storage key |
| Modify home dashboard | `src/pages/Home.tsx` |

## Next Immediate Steps

1. Build seizure diary entry form
2. Implement seizure entry storage
3. Create care plan form sections
4. Implement dosing calculator
5. Add backup/export functionality

---

**Document Status:** Initial setup complete  
**Last Updated:** February 1, 2026  
**Authors:** Dr. Odet Mark Aszkenasy, Dr. Ramesh Kumar
