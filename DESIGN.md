# Solura Cosmetics — Design Brief

## Purpose & Tone
Premium beauty e-commerce for South India. Tone: aspiration meets trust, editorial elegance, scientific rigor paired with emotional desire. Psychology: "Reveal Your Natural Glow" — skin as canvas, products as tools for self-expression.

## Color Palette (OKLCH)
| Semantic | Light | Dark | Purpose |
|----------|-------|------|---------|
| Primary (Rose) | 0.65 0.12 15 | 0.75 0.14 15 | CTAs, highlights, brand accent |
| Secondary (Gold) | 0.78 0.1 85 | 0.82 0.08 85 | Warmth, luxury detail, hover states |
| Background | 0.995 0 0 | 0.11 0 0 | Clean canvas for content |
| Muted (Sage) | 0.92 0.02 280 | 0.25 0.02 280 | Neutral contrast, secondary text |
| Foreground | 0.12 0 0 | 0.94 0 0 | Body text, high contrast |

## Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Fraunces (serif, 400–700) | H1–H3, hero tagline, testimonial quotes |
| Body | DM Sans (sans, 400–700) | Body copy, product descriptions, navigation |
| Mono | JetBrains Mono | Code, price tags, order IDs |

## Elevation & Depth
- **Cards**: soft shadow (0 4px 20px rgba 8% opacity)
- **Modals/popovers**: elevated shadow (0 12px 40px rgba 12% opacity)
- **Subtle depth**: card backgrounds at 1.0 C 0.01 H (imperceptible cream tint vs pure white)
- **Dark mode**: card backgrounds at 0.15 C 0.01 H (near-black with depth)

## Structural Zones
| Zone | Background | Border | Purpose |
|------|------------|--------|---------|
| Header | card (subtle cream) | border (light) | Navigation, sticky, minimal shadow |
| Hero | background (pure white) + gradient accent | none | Product hero, aspirational imagery |
| Product Grid | background | none | Clean, card-based layout with soft shadows |
| Testimonials | muted/30 (pale sage) | none | Social proof section, subtle differentiation |
| Footer | muted/60 (darker sage) | border-t | Company info, legal, soft contrast |
| Admin Panel | sidebar (white/dark) + content (background) | border | Dashboard, charts, form inputs |

## Spacing & Rhythm
- **Base unit**: 4px. Scales: 0.5rem (2), 1rem (4), 1.5rem (6), 2rem (8), 3rem (12), 4rem (16), 6rem (24).
- **Content width**: max-w-5xl (container centered at 2rem padding)
- **Card padding**: 1.5rem–2rem. Generous breathing room, not cramped.
- **Gap between sections**: 4rem–6rem. Editorial spacing, not tight grids.

## Component Patterns
- **Buttons**: Primary (rose fill, white text) + secondary (transparent, rose text, rose border). Rounded-md (0.5rem), min 44px height for mobile.
- **Product cards**: Image + overlay on hover (gradient-rose with text), title, price (mono), rating (stars), "Add to Cart" CTA with secondary styling.
- **Forms**: DM Sans body, rose inputs on focus, rose placeholder text, validation via rose border + destructive text.
- **Badges**: Trust icons (certified, cruelty-free) in muted sage, border-sm, 0.75rem padding.

## Motion & Interaction
- **Fade-in**: content entering viewport (0.4s ease-out)
- **Slide-in-up**: hero CTA buttons (0.5s cubic-bezier 0.4, 0, 0.2, 1)
- **Hover**: rose text → rose fill (background) on CTAs, 0.3s smooth transition
- **Micro-interactions**: product hover lifts card (shadow-xs → shadow-soft), price glimmers (secondary color pulse)

## Constraints & Anti-patterns
- ✗ No neon, no rainbow palettes. Limit to rose + gold + sage + neutrals.
- ✗ No sans-serif in display headers. Fraunces serif creates editorial authority.
- ✗ No full-page gradients. Gradients only on CTAs, hero accents, section dividers.
- ✗ No rounded-full on cards. Rounded-md (0.5rem) for premium restraint.
- ✗ No default Tailwind shadows. Use custom soft/elevated only.

## Signature Detail
**Gradient rose underlines on key phrases** (e.g., "Reveal Your Natural Glow" h1, product category headers). Subtle animation: gradient-rose appears on scroll. Creates visual rhythm without clutter. Reinforces brand duality: both soft + strong.

## Conversion Psychology
- **Trust**: testimonials above fold, certification badges (dermatologist-tested, cruelty-free), product origin (South India). 
- **Urgency**: stock indicators ("2 left"), bestseller badges.
- **Desire**: aspirational product photography (glowing skin, natural beauty), before/after implied via testimonials.
- **Accessibility**: WCAG AA+ contrast (rose on white, gold on white validated). Semantic HTML. Keyboard navigation on all CTAs.

## Exports
- **index.css**: OKLCH color tokens (light + dark), font-face declarations (Fraunces, DM Sans, JetBrains Mono), custom utilities (gradient-rose, gradient-gold, shadow-soft, shadow-elevated).
- **tailwind.config.js**: boxShadow (soft, elevated), keyframes (fade-in, slide-in-up), animations (fade-in 0.4s, slide-in-up 0.5s).
- **Design assets**: `.platform/design/preview-*.jpg` (hero reference image).
