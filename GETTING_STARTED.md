# Getting Started with EpilepsyHelper

## Project Status: Core Features Complete

All main features are now implemented and ready for testing/deployment.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at http://localhost:5173

## Completed Features

### Seizure Diary
- Log seizures with date, time, type, duration, triggers
- Search and filter entries
- Edit and delete functionality
- Emergency medication tracking
- Expandable entry details

### Care Plan Generator
- Personal information with auto-calculated age
- NICE/BNF-C dosing calculator for emergency medications:
  - Buccolam (buccal midazolam)
  - Rectal Diazepam
  - Epistatus (nasal midazolam)
- Daily medications management
- Emergency protocol customization
- PDF export via print dialog

### Emergency Page
- Quick-reference card pulling from Care Plan
- Large 999 call button with direct dial
- Emergency medications displayed prominently
- Generic seizure first aid for new users

### Care Team
- Healthcare professionals directory
- Emergency contacts with primary designation
- Synced with Care Plan data
- Quick call buttons

### Resources
- UK epilepsy charities and organizations
- Medical information sources (NHS, NICE)
- Education resources for schools
- SUVIMA integration
- Helpline quick access

### Procedures
- EEG preparation guide
- Sleep-deprived EEG guide
- MRI scan preparation
- Blood tests guide
- Kids-friendly mode for each

### About & Settings
- App information
- Backup/export all data (JSON)
- Restore from backup
- Delete all data

### Privacy
- Full privacy policy
- Medical disclaimer
- Terms of use

## Design System

### Colors
- **Primary (Purple)**: `#8b5cf6` - Epilepsy awareness color
- **Accent (Teal)**: `#14b8a6` - Calm, healthcare, trust
- **Emergency (Red)**: `#ef4444` - Urgent actions

### CSS Classes
- `.card` - White card with shadow
- `.btn-primary` - Purple gradient button
- `.btn-secondary` - Outline button
- `.btn-emergency` - Red button
- `.form-input` - Styled input field
- `.form-label` - Form label styling

## Data Storage

All data is stored locally using localStorage:
- `epilepsy-app-role` - User role selection
- `epilepsy-seizure-diary` - Seizure entries
- `epilepsy-care-plan` - Care plan (includes team & contacts)
- `epilepsy-last-backup` - Last backup timestamp

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx            # Dashboard ✓
│   ├── SeizureDiary.tsx    # Seizure tracking ✓
│   ├── CarePlan.tsx        # Care plan generator ✓
│   ├── CareTeam.tsx        # Healthcare team ✓
│   ├── Emergency.tsx       # Emergency reference ✓
│   ├── Resources.tsx       # Educational resources ✓
│   ├── Procedures.tsx      # Medical procedure prep ✓
│   ├── About.tsx           # About + backup/restore ✓
│   └── Privacy.tsx         # Privacy policy ✓
├── components/
│   └── layout/
│       └── AppShell.tsx    # Navigation layout
├── hooks/
│   └── useLocalStorage.ts  # Data persistence
└── types/
    ├── seizure.ts          # Seizure types
    └── carePlan.ts         # Care plan types
```

## Next Steps for Deployment

1. **Add PWA Assets**
   - Create favicon.ico
   - Create PWA icons (192x192, 512x512)
   - Create og-image.png for social sharing

2. **Deploy to Netlify**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Optional Enhancements**
   - Calendar view for seizure diary
   - Seizure statistics/charts
   - Accessibility audit

## Testing Checklist

- [ ] Role selection works (Parent, Young Person, Professional)
- [ ] Seizure diary: add, edit, delete, search, filter
- [ ] Care plan: fill all sections, dosing calculator, PDF export
- [ ] Emergency page: shows care plan data correctly
- [ ] Care team: add, edit, delete contacts
- [ ] Resources: all external links work
- [ ] Procedures: toggle kids mode
- [ ] About: backup export/import works
- [ ] Mobile navigation works
- [ ] Desktop sidebar works

## Contact

Created by:
- Dr. Odet Mark Aszkenasy
- Dr. Ramesh Kumar

Part of the SUVIMA ecosystem: https://suvima.org

---

**All core features complete and ready for deployment!**
