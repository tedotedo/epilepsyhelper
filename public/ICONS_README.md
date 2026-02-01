# PWA Icons Setup

## Icon Design
The EpilepsyHelper icon features:
- **Purple gradient background** (#8b5cf6 to #7c3aed) - epilepsy awareness color
- **White heart** - representing care and health
- **EKG/pulse line** through the heart - representing medical monitoring

## Files Needed

The following PNG files need to be generated from the SVG sources:

| File | Size | Purpose |
|------|------|---------|
| `favicon-16x16.png` | 16x16 | Browser tab (small) |
| `favicon-32x32.png` | 32x32 | Browser tab (standard) |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `web-app-manifest-192x192.png` | 192x192 | Android PWA |
| `web-app-manifest-512x512.png` | 512x512 | Android PWA (splash) |
| `og-image.png` | 1200x630 | Social media sharing |

## How to Generate PNGs

### Option 1: Online Tool (Easiest)
1. Go to https://realfavicongenerator.net/
2. Upload `icon.svg`
3. Download the generated package
4. Extract and place files in this `/public` folder

### Option 2: Using Figma/Sketch
1. Import `icon.svg` into Figma or Sketch
2. Export at each required size as PNG

### Option 3: Command Line (if ImageMagick installed)
```bash
# Install ImageMagick first (macOS)
brew install imagemagick

# Generate all sizes
convert icon.svg -resize 16x16 favicon-16x16.png
convert icon.svg -resize 32x32 favicon-32x32.png
convert apple-touch-icon.svg -resize 180x180 apple-touch-icon.png
convert icon.svg -resize 192x192 web-app-manifest-192x192.png
convert icon.svg -resize 512x512 web-app-manifest-512x512.png
```

### Option 4: Using rsvg-convert (Linux/macOS)
```bash
# Install librsvg (macOS)
brew install librsvg

# Generate all sizes
rsvg-convert -w 16 -h 16 icon.svg > favicon-16x16.png
rsvg-convert -w 32 -h 32 icon.svg > favicon-32x32.png
rsvg-convert -w 180 -h 180 apple-touch-icon.svg > apple-touch-icon.png
rsvg-convert -w 192 -h 192 icon.svg > web-app-manifest-192x192.png
rsvg-convert -w 512 -h 512 icon.svg > web-app-manifest-512x512.png
```

## OG Image for Social Sharing

Create `og-image.png` (1200x630px) with:
- Purple gradient background
- EpilepsyHelper logo/icon centered
- "EpilepsyHelper" text
- Tagline: "Track seizures. Manage care plans. Support families."

You can create this in Canva, Figma, or any image editor.

## Testing PWA Installation

After generating the icons:

1. Run `npm run build`
2. Run `npm run preview`
3. Open Chrome DevTools → Application → Manifest
4. Check all icons load correctly
5. Test "Add to Home Screen" on mobile

## Current SVG Files

- `icon.svg` - Main app icon (512x512 viewBox)
- `favicon.svg` - Small favicon version (32x32 viewBox)
- `apple-touch-icon.svg` - Apple touch icon (180x180 viewBox)
