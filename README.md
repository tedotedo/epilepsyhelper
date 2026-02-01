# EpilepsyHelper

A Progressive Web App (PWA) to help families manage epilepsy with confidence. Track seizures, create care plans, and access helpful resources.

## Features

- **Seizure Diary**: Log and track seizure events with detailed information
- **Care Plan Generator**: Create personalized emergency protocols based on NICE guidelines
- **Emergency Information**: Quick access to critical care information
- **Care Team Management**: Keep contact details for healthcare providers
- **Procedure Preparation**: Interactive guides for EEG, MRI, and other medical procedures
- **Educational Resources**: Links to SUVIMA and other trusted information
- **Backup/Restore**: Export and import your data

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

## PWA Icons Setup

The app includes SVG icons in the `public/` folder. For full PWA support (iOS/Android home screen), you need to generate PNG versions.

### Icon Files Needed

| File | Size | Purpose |
|------|------|---------|
| `favicon-16x16.png` | 16x16 | Browser tab (small) |
| `favicon-32x32.png` | 32x32 | Browser tab (standard) |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `web-app-manifest-192x192.png` | 192x192 | Android PWA |
| `web-app-manifest-512x512.png` | 512x512 | Android PWA (splash) |
| `og-image.png` | 1200x630 | Social media sharing |

### Generate PNGs (Choose One Method)

#### Option 1: Online Tool (Easiest)
1. Go to https://realfavicongenerator.net/
2. Upload `public/icon.svg`
3. Download the generated package
4. Extract and place files in `/public` folder

#### Option 2: Using ImageMagick
```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Generate all sizes
cd public
convert icon.svg -resize 16x16 favicon-16x16.png
convert icon.svg -resize 32x32 favicon-32x32.png
convert apple-touch-icon.svg -resize 180x180 apple-touch-icon.png
convert icon.svg -resize 192x192 web-app-manifest-192x192.png
convert icon.svg -resize 512x512 web-app-manifest-512x512.png
```

#### Option 3: Using rsvg-convert
```bash
# Install librsvg (macOS)
brew install librsvg

# Generate all sizes
cd public
rsvg-convert -w 16 -h 16 icon.svg > favicon-16x16.png
rsvg-convert -w 32 -h 32 icon.svg > favicon-32x32.png
rsvg-convert -w 180 -h 180 apple-touch-icon.svg > apple-touch-icon.png
rsvg-convert -w 192 -h 192 icon.svg > web-app-manifest-192x192.png
rsvg-convert -w 512 -h 512 icon.svg > web-app-manifest-512x512.png
```

### OG Image for Social Sharing

Create `og-image.png` (1200x630px) with:
- Purple gradient background
- EpilepsyHelper logo/icon centered
- "EpilepsyHelper" text
- Tagline: "Track seizures. Manage care plans. Support families."

You can create this in Canva, Figma, or any image editor.

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
│   ├── About.tsx           # About page + backup/restore
│   └── Privacy.tsx         # Privacy & disclaimer
├── hooks/
│   └── useLocalStorage.ts  # Custom hook for persisted state
└── types/
    ├── seizure.ts          # Seizure entry types
    └── carePlan.ts         # Care plan types
```

## Data Storage

All user data is stored locally using localStorage:

| Key | Purpose |
|-----|---------|
| `epilepsy-app-role` | User role (parent-carer, young-person, professional) |
| `epilepsy-seizure-diary` | Seizure entries |
| `epilepsy-care-plan` | Care plan data (includes contacts & team) |
| `epilepsy-last-backup` | Last backup timestamp |

## Privacy First

- No accounts required
- All data stays on your device
- No tracking or analytics
- Export/backup your data anytime
- Full data portability (JSON export/import)

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

The app will automatically deploy on every push to main.

## Relationship to SUVIMA

EpilepsyHelper is part of the SUVIMA (Supporting Understanding Via Information for Medical Awareness) family of resources. While SUVIMA provides comprehensive educational content about epilepsy, EpilepsyHelper offers practical tools for daily management.

- **SUVIMA**: Educational content and information
- **EpilepsyHelper**: Interactive tools and tracking

## License

Copyright © 2026 Dr. Odet Mark Aszkenasy & Dr. Ramesh Kumar

## Contact

For feedback or questions, visit [epilepsyhelper.app](https://epilepsyhelper.app)
