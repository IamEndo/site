# PayDeck Website

Open-source, non-custodial point-of-sale for instant Nexa payments.

## Project Structure

```
app/
├── layout.tsx              # Root layout (fonts, metadata)
├── page.tsx                # Main page (assembles sections)
├── globals.css             # Global styles
├── robots.ts               # SEO robots
├── sitemap.ts              # SEO sitemap
│
├── _data/                  # Content data (separated from UI)
│   ├── features.ts         # Feature list
│   ├── steps.ts            # How it works steps
│   ├── faqs.ts             # FAQ content
│   └── device.ts           # Hardware specs
│
└── _components/
    ├── layout/
    │   ├── Header.tsx      # Navigation header
    │   └── Footer.tsx      # Site footer
    │
    ├── sections/           # Page sections
    │   ├── Hero.tsx
    │   ├── Features.tsx
    │   ├── Device.tsx
    │   ├── HowItWorks.tsx
    │   ├── Comparison.tsx
    │   └── FAQ.tsx
    │
    └── ui/                 # Reusable components
        ├── Button.tsx
        ├── Accordion.tsx
        └── Badge.tsx

lib/
├── cn.ts                   # Classname utility
└── constants.ts            # Site config & design tokens

public/
├── images/                 # Static images
├── favicon.ico
├── og.png                  # Open Graph image
└── ...
```

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Font**: Space Grotesk (squared, modern)
- **Icons**: Lucide React
- **TypeScript**: Strict mode

## Design Principles

- **Squared corners**: Professional, less generic
- **High contrast**: Black/white with clean hierarchy
- **Asymmetric layouts**: Staggered features, split hero
- **Generous whitespace**: Let content breathe
- **Mobile-first**: Responsive throughout

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Customization

### Content
Edit files in `app/_data/` to update:
- Features
- How it works steps
- FAQ items
- Device specifications

### Styling
- Design tokens: `lib/constants.ts`
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`

### Branding
Update `lib/constants.ts` for:
- Site name
- URLs (GitLab, Telegram)
- Navigation links

## License

Open-source software. See LICENSE for details.
