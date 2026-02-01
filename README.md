# EpilepsyHelper

A Progressive Web App (PWA) to help families manage epilepsy with confidence. Track seizures, create care plans, and access helpful resources.

## Features

- **Seizure Diary**: Log and track seizure events with detailed information
- **Care Plan Generator**: Create personalized emergency protocols based on NICE guidelines
- **Emergency Information**: Quick access to critical care information
- **Care Team Management**: Keep contact details for healthcare providers
- **Procedure Preparation**: Interactive guides for EEG, MRI, and other medical procedures
- **Educational Resources**: Links to SUVIMA and other trusted information

## Tech Stack

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.x
- **Routing**: React Router DOM 7.11.0
- **Styling**: Tailwind CSS 3.4.17
- **PWA**: vite-plugin-pwa
- **Data**: localStorage (no backend, privacy-first)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

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

## Project Structure

```
src/
├── App.tsx                 # Main router configuration
├── main.tsx                # Entry point
├── index.css               # Global styles + Tailwind
├── components/
│   ├── home/               # Home page components
│   └── layout/
│       └── AppShell.tsx    # Main layout with sidebar & bottom nav
├── pages/
│   ├── Home.tsx            # Dashboard with role selection
│   ├── SeizureDiary.tsx    # Seizure tracking
│   ├── CarePlan.tsx        # Care plan generator
│   ├── CareTeam.tsx        # Healthcare team contacts
│   ├── Emergency.tsx       # Emergency protocols
│   ├── Resources.tsx       # Educational resources
│   ├── Procedures.tsx      # Medical procedure prep
│   ├── About.tsx           # About page
│   └── Privacy.tsx         # Privacy & disclaimer
├── hooks/
│   └── useLocalStorage.ts  # Custom hook for persisted state
└── types/
    ├── seizure.ts          # Seizure entry types
    └── carePlan.ts         # Care plan types
```

## Data Storage

All user data is stored locally using localStorage:

- `epilepsy-app-role`: User role (parent-carer | young-person | professional)
- `epilepsy-seizure-diary`: Seizure entries
- `epilepsy-care-plan`: Care plan data
- `epilepsy-care-team`: Healthcare team members
- `epilepsy-emergency-contacts`: Emergency contacts
- `epilepsy-medications`: Medication list

## Privacy First

- No accounts required
- All data stays on your device
- No tracking or analytics
- Export/backup your data anytime

## Relationship to SUVIMA

EpilepsyHelper is part of the SUVIMA (Supporting Understanding Via Information for Medical Awareness) family of resources. While SUVIMA provides comprehensive educational content about epilepsy, EpilepsyHelper offers practical tools for daily management.

- **SUVIMA**: Educational content and information
- **EpilepsyHelper**: Interactive tools and tracking

## License

Copyright © 2026 Dr. Odet Mark Aszkenasy & Dr. Ramesh Kumar

## Contact

For feedback or questions, visit [epilepsyhelper.app](https://epilepsyhelper.app)
