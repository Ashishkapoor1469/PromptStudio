---
name: Cyber-Solar Aesthetic
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d6c4ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9e8e78'
  outline-variant: '#514532'
  surface-tint: '#ffba38'
  primary: '#ffd79b'
  on-primary: '#432c00'
  primary-container: '#ffb300'
  on-primary-container: '#6b4900'
  inverse-primary: '#7e5700'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#dfdddc'
  on-tertiary: '#303030'
  tertiary-container: '#c3c1c1'
  on-tertiary-container: '#4f4f4f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdeac'
  primary-fixed-dim: '#ffba38'
  on-primary-fixed: '#281900'
  on-primary-fixed-variant: '#604100'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  code:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0'
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is a sophisticated fusion of industrial precision and solar energy. It targets a professional audience that values technical performance, high-end hardware interfaces, and architectural clarity. The aesthetic moves away from the trend of transparency, instead grounding the user in a solid, high-contrast environment that feels both grounded and illuminated.

The style is defined by a "Hard-Tech Minimalism." It utilizes sharp geometries and the stark contrast between deep voids and brilliant solar highlights. The emotional response is one of focused authority and high-performance reliability. By avoiding glassmorphism, the design system emphasizes structural integrity and the permanence of physical controls, using light not as a material, but as a functional indicator and a source of warmth within a technical dark mode.

## Colors

The color palette is built on a foundation of "Deep Charcoal" (#121212), which provides a stable, low-fatigue background for professional workflows. "Rich Amber" (#FFB300) serves as the primary energetic driver, used for critical actions, status indicators, and subtle glowing accents that mimic solar light. 

"Soft Cream" (#F5F5F5) provides a humanistic contrast to the technical charcoal, used primarily for high-readability typography and secondary UI elements. For surface variations, a range of mid-tone charcoals and muted ambers are used to define boundaries without breaking the dark-mode immersion.

## Typography

This design system utilizes Inter for its systematic utility and neutral, modernist profile. The typographic hierarchy is designed for rapid information scanning and data-heavy environments. 

Headlines use heavy weights and tight letter-spacing to command attention, while body copy maintains generous line heights for long-form readability. A specialized "Label-Caps" style is used for metadata, technical specifications, and navigational breadcrumbs, reinforcing the "Cyber" technicality of the interface through uppercase styling and increased tracking.

## Layout & Spacing

The design system employs a strict 12-column fixed grid with an 8px base spacing unit. This creates a rhythmic, predictable layout that feels engineered rather than decorative. 

Margins and gutters are generous to prevent visual clutter in a high-contrast dark environment. Components should align to the grid boundaries with surgical precision. Negative space is not just used for breathing room, but as a deliberate structural element to separate functional modules without the need for excessive borders.

## Elevation & Depth

Depth in this design system is achieved through "Tonal Stacking" rather than shadows or transparency. Higher elevation levels are represented by progressively lighter shades of charcoal. 

1.  **Base:** #121212
2.  **Surface:** #1B1B1B
3.  **Raised:** #242424
4.  **Overlay:** #2A2A2A

To create the "Solar" effect, use subtle inner or outer glows using the Amber color with low opacity (10-20%) on active or focused elements. These glows should feel like "light leaks" from a precise source, rather than soft, ambient shadows. Solid, 1px borders in #2A2A2A are used to define the edges of surfaces at the same elevation.

## Shapes

The shape language is strictly geometric. All primary containers, buttons, and input fields utilize 0px border-radii (Sharp). This reinforces the industrial, professional nature of the design system. 

In rare instances where a distinction between nested elements is required, a minimal 2px radius may be applied to small components like tags or chips, but the overarching silhouette of the UI must remain rectangular and sharp. This uncompromising geometry distinguishes the design system from softer, consumer-grade aesthetics.

## Components

### Buttons
Primary buttons are solid Rich Amber (#FFB300) with Deep Charcoal text. They feature no rounded corners. On hover, they gain a 4px outer glow of Amber. Secondary buttons are outlined in Soft Cream (#F5F5F5) with Cream text.

### Input Fields
Inputs use the #1B1B1B surface color with a 1px Soft Cream bottom border. When focused, the border transitions to Rich Amber with a very subtle vertical amber glow (2px blur) beneath the line.

### Cards & Modules
Cards are solid surfaces (#1B1B1B) with no shadows. High-priority cards may feature a 2px top-border in Rich Amber to signify importance or "Solar illumination."

### Iconography
Icons must be "stroke-based," using 1.5pt or 2pt weights with sharp joins. They should be rendered in Soft Cream for standard states and Rich Amber for active or interactive states.

### Chips & Tags
Technical tags are styled with a Deep Charcoal background and a 1px Soft Cream border, using the "Label-Caps" typographic style for high-density information display.

### Data Visualization
Charts and graphs should exclusively use Amber and Cream against the Charcoal background. Use solid fills for area charts and sharp, non-curved lines for line graphs to maintain the technical aesthetic.