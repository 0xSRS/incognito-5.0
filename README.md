# Incognito 5.0 — Next.js Edition

A cinematic, Godfather-themed freshers' night invitation website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎬 Overview

This is a complete Next.js port of the original single-page HTML site for "Incognito 5.0" — a freshers' night event by the School of Cybersecurity and Digital Forensics (SCSDF). The site features:

- **Ornate gold frame** with decorative corners
- **Ken Burns animations** on hero images
- **Scroll-triggered reveals** with intersection observer
- **GSAP-powered hero entrance sequence**
- **Metallic gold typography** with gradient text effects
- **Continuous noir background** with film grain overlay
- **Fully responsive design** optimized for mobile devices
- **Six mafia family sections** with distinct visual styles

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd incognito-5.0

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
incognito-5.0/
├── public/
│   ├── fonts/              # Custom fonts (Godfather, Goldoni, Italianno)
│   └── images/             # Event photos (Frame 1-5)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Main page composition
│   ├── components/
│   │   ├── CinematicArchive.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── InvitationSection.tsx
│   │   ├── MrMsFreshers.tsx
│   │   ├── Navigation.tsx
│   │   ├── OrnateFrame.tsx
│   │   ├── RegistrationDossiers.tsx
│   │   ├── StatementBreak.tsx
│   │   ├── TheFamilies.tsx
│   │   └── TheNight.tsx
│   ├── lib/
│   │   └── useScrollReveal.ts  # Intersection Observer hook
│   └── styles/
│       └── globals.css         # All custom styles, animations, responsive breakpoints
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Typography

- **Display:** Godfather + Goldoni (titles)
- **Editorial:** Goldoni (uppercase labels, navigation)
- **Script:** Italianno (cursive accents)
- **Body:** Iowan Old Style, Palatino, Georgia (serif fallback)

### Color Palette

```css
--black: #0a0705          /* Deep noir background */
--parchment: #ece1c6      /* Primary text */
--gold: #b8923f           /* Accent gold */
--gold-bright: #e0b563    /* Highlights */
--blood: #5c0f16          /* Blood red accents */
--smoke: #16110d          /* Card backgrounds */
```

### Components

#### Hero Section
- Full viewport height with Ken Burns animation
- GSAP timeline orchestration (6-stage reveal)
- Metallic gold title with stroke effects
- Dual CTA buttons (primary + secondary)

#### Ornate Frame
- Fixed position decorative border
- Filigree corner ornaments
- Scales down on mobile (<680px)

#### Scroll Reveals
- Intersection Observer with 18% threshold
- Staggered opacity + translateY transitions
- `.reveal` and `.reveal-mask` classes

#### Section Cards
- Don card (parchment paper style)
- Crew grid (6 family cards with monograms)
- Dossier cards (4 registration options)
- Duo cards (Mr. & Ms. Freshers)

## 📱 Mobile Responsiveness

All breakpoints preserved from the original:

- **< 390px:** Ultra-compact mobile
- **< 480px:** Small mobile adjustments
- **< 600px:** Mobile hero stacking
- **< 640px:** Archive grid single column
- **< 680px:** Frame scaling
- **< 700px:** Navigation compression
- **< 760px:** Duo cards stack
- **< 860px:** Invitation grid reflow

## 🔗 External Links

All registration forms and event links are live:

- Freshers Registration
- SCSDF Family Registration
- Mr. & Ms. Freshers Contest
- Treasure Hunt Sign-up

## ⚡ Performance

- Next.js Image optimization for all photos
- GSAP loaded via CDN (beforeInteractive)
- CSS animations with GPU acceleration
- Scroll reveal with passive event listeners
- Turbopack development server (3.2s startup)

## 🎭 Original Design Credits

This Next.js implementation faithfully recreates the original single-page HTML design by the SCSDF team for Incognito 5.0.

## 📄 License

MIT

---

**Event Details:**
- Date: October 5, 2026
- Time: 4:30 PM onwards
- Venue: Upper Auditorium
- Eligibility: SCSDF students only
