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
├── vite-env.d.ts           # Vite type declarations
├── components/
│   ├── home/               # Home page components (TBD)
│   └── layout/
│       └── AppShell.tsx    # Main layout wrapper (sidebar + bottom nav)
├── pages/
│   ├── Home.tsx            # Dashboard with role toggle
│   ├── SeizureDiary.tsx    # Seizure tracking ✓
│   ├── CarePlan.tsx        # Care plan generator ✓
│   ├── CareTeam.tsx        # Healthcare team ✓
│   ├── Emergency.tsx       # Emergency protocols ✓
│   ├── Resources.tsx       # Educational resources ✓
│   ├── Procedures.tsx      # Medical procedure prep ✓
│   ├── About.tsx           # About page + backup/restore ✓
│   └── Privacy.tsx         # Privacy & disclaimer ✓
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
| `/about` | About | About EpilepsyHelper + backup/restore |
| `/privacy` | Privacy | Privacy policy & medical disclaimer |

## Data Persistence

All user data is stored in localStorage using these keys:

| Storage Key | Data Type | Purpose |
|-------------|-----------|---------|
| `epilepsy-app-role` | `'parent-carer' \| 'young-person' \| 'professional'` | User role selection |
| `epilepsy-seizure-diary` | `{ entries: SeizureEntry[] }` | Seizure log |
| `epilepsy-care-plan` | `CarePlan` | Personal care plan (includes team & contacts) |
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

### Phase 1 - Foundation ✓
- [x] Project setup
- [x] Basic routing
- [x] AppShell layout
- [x] Home page with role selection
- [x] Placeholder pages

### Phase 2 - Seizure Diary ✓
- [x] Entry form (date, time, type, duration, triggers)
- [x] List view with filters and search
- [x] Expandable entry details
- [x] Edit and delete functionality
- [x] Emergency medication tracking
- [ ] Calendar view (future enhancement)
- [ ] Export to PDF (future enhancement)

### Phase 3 - Care Plan Generator ✓
- [x] Personal information form with auto-calculated age
- [x] Emergency medication dosing calculator (NICE/BNF-C)
- [x] Buccolam, Rectal Diazepam, Epistatus calculations
- [x] Emergency protocol template (when to give meds, when to call 999)
- [x] Daily medications management
- [x] Emergency contacts with primary designation
- [x] Healthcare team management
- [x] PDF export via browser print
- [x] Medical disclaimers throughout

### Phase 4 - Additional Features ✓
- [x] Care Team page (synced with Care Plan data)
- [x] Emergency quick reference (pulls from Care Plan)
- [x] Educational resources with UK charity links
- [x] SUVIMA integration and links
- [x] Procedures page (EEG, MRI, blood tests prep)
- [x] Kids-friendly mode for procedure guides
- [x] Backup/restore functionality (JSON export/import)
- [x] About page with app info
- [x] Privacy policy and medical disclaimers

### Phase 5 - Polish (Remaining)
- [ ] PWA icons and favicon
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Netlify deployment
- [ ] og-image for social sharing

## Feature Details

### Seizure Diary
- Form fields: date, time, seizure type, duration, description, triggers, location, witnesses
- Advanced fields: emergency med given, recovery time, ambulance called, hospital visit
- Common triggers as selectable chips
- Search by description, notes, or location
- Filter by seizure type

### Care Plan Generator
- Accordion sections (Personal, Medications, Emergency, Contacts, Team)
- NICE/BNF-C dosing calculator:
  - Buccolam: Age-banded (2.5mg-10mg based on age)
  - Rectal Diazepam: Weight-based (0.5mg/kg, max 10-20mg)
  - Epistatus: Age-banded nasal midazolam
- PDF export generates printable care plan with all sections

### Emergency Page
- Large 999 call button with direct dial
- Pulls data from Care Plan for personalized info
- Shows emergency medications prominently
- Generic seizure first aid for users without care plan

### Resources Page
- UK Epilepsy Charities (Epilepsy Action, Epilepsy Society, Young Epilepsy, etc.)
- Medical Information (NHS, NICE guidelines, GOSH)
- Education resources for schools
- Support communities and helplines
- SUVIMA integration

### Procedures Page
- EEG preparation guide
- Sleep-deprived EEG guide
- MRI scan preparation
- Blood tests guide
- Each has kids-friendly mode toggle

### Backup/Restore
- Export all localStorage data as JSON file
- Import/restore from backup file
- Delete all data option with confirmation
- Located in About page

## SUVIMA Integration

EpilepsyHelper is designed to complement SUVIMA:
- **SUVIMA**: Educational content about epilepsy
- **EpilepsyHelper**: Practical management tools

Cross-linking strategy:
- Link to SUVIMA from Resources page
- Featured card on Resources page
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
- Backup/restore gives full data portability

## Key Files for Common Tasks

| Task | Files to Edit |
|------|---------------|
| Add new page | `src/pages/NewPage.tsx`, `src/App.tsx` (add route) |
| Modify navigation | `src/components/layout/AppShell.tsx` |
| Change colors/theme | `tailwind.config.js` |
| Add localStorage data | Create hook in `src/hooks/`, add storage key |
| Modify home dashboard | `src/pages/Home.tsx` |
| Update seizure types | `src/types/seizure.ts` |
| Update care plan structure | `src/types/carePlan.ts` |

## Next Steps (Future Enhancements)

1. Add calendar view to Seizure Diary
2. Add seizure diary PDF export
3. Add PWA icons and favicon
4. Create og-image.png for social sharing
5. Accessibility audit (WCAG compliance)
6. Deploy to Netlify
7. Add seizure statistics/visualizations
8. Add medication reminders (if requested)

---

**Document Status:** All core features complete
**Last Updated:** February 1, 2026
**Authors:** Dr. Odet Mark Aszkenasy, Dr. Ramesh Kumar
