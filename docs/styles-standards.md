The site is built around an **urban, edgy, and youthful aesthetic** (characterized by their slogan "We are the revolution" and the use of military imagery like the "placa militar con estrella").

Here are the extracted design tokens and styles you can use to match this product's look and feel.

### 1. Design Tokens (CSS Variables)

To replicate their brand identity, you should rely on a dark mode-first approach with high-contrast text and industrial/grunge accents.

```css
:root {
  /* 🎨 Color Palette */
  --nxt-bg-main: #0a0a0a;         /* Deep black for the primary background */
  --nxt-bg-surface: #141414;      /* Slightly lighter shade for cards and overlays */
  --nxt-text-primary: #ffffff;    /* Stark white for high contrast headings */
  --nxt-text-secondary: #a3a3a3;  /* Muted gray for body text */
  --nxt-accent: #ff2a2a;          /* Bold red for "Revolution" accents / active states */
  --nxt-border: #333333;          /* Dark gray for subtle separations */

  /* 🅰️ Typography */
  --nxt-font-heading: 'Montserrat', 'Oswald', sans-serif; /* Bold, blocky, impactful */
  --nxt-font-body: 'Inter', 'Helvetica Neue', sans-serif; /* Clean and legible */
  
  --nxt-text-xl: 3.5rem;
  --nxt-text-lg: 2rem;
  --nxt-text-base: 1rem;
  --nxt-text-sm: 0.875rem;

  --nxt-weight-black: 900;
  --nxt-weight-bold: 700;
  --nxt-weight-regular: 400;

  /* 📏 Spacing & Layout */
  --nxt-space-xs: 0.5rem;
  --nxt-space-sm: 1rem;
  --nxt-space-md: 2rem;
  --nxt-space-lg: 4rem;
  --nxt-space-xl: 8rem;

  /* 🔲 Borders & Effects */
  --nxt-radius-none: 0px;         /* Sharp edges fit the military/urban theme better */
  --nxt-radius-sm: 4px;
  --nxt-border-thick: 3px solid var(--nxt-text-primary);
}

```

### 2. Typography Styles

The typography should be loud and assertive to match the "We are the revolution" branding.

* **Headings (H1, H2, H3):** Use uppercase letters, tight letter-spacing, and maximum font weights (800 or 900).
* **Special Text ("Dame de tu paz..."):** The site features specific styled text blocks. To replicate this, use a handwritten or distressed display font to contrast with the blocky main headings.
* **Body Text:** Keep it minimal, legible, and slightly muted (gray) so the white headings pop.

```css
h1, h2, h3 {
  font-family: var(--nxt-font-heading);
  color: var(--nxt-text-primary);
  text-transform: uppercase;
  font-weight: var(--nxt-weight-black);
  letter-spacing: -0.02em;
  margin-bottom: var(--nxt-space-sm);
}

p {
  font-family: var(--nxt-font-body);
  color: var(--nxt-text-secondary);
  line-height: 1.6;
}

```

### 3. Key Component Styles

**The "Letter" Button (¡Ver carta!)**
Buttons on this style of site typically avoid soft, rounded aesthetics. Opt for sharp, high-contrast, "brutalist" buttons.

```css
.btn-primary {
  background-color: transparent;
  color: var(--nxt-text-primary);
  border: var(--nxt-border-thick);
  padding: 1rem 2rem;
  font-family: var(--nxt-font-heading);
  font-weight: var(--nxt-weight-bold);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--nxt-text-primary);
  color: var(--nxt-bg-main);
}

```

**Social & Platform Icons**
The site features a prominent block for social media and streaming (Facebook, YouTube, Instagram, Spotify).

* **Style:** Minimalist, monochromatic (pure white or gray).
* **Hover state:** Shift to the `--nxt-accent` color or scale up slightly.

```css
.social-icon {
  fill: var(--nxt-text-primary);
  width: 32px;
  height: 32px;
  transition: fill 0.2s ease, transform 0.2s ease;
}

.social-icon:hover {
  fill: var(--nxt-accent);
  transform: translateY(-3px);
}

```

### 4. Layout Architecture

* **Full-Screen Sections:** The site relies on viewport-height sections (`min-height: 100vh`).
* **Centered Alignment:** Content like the "Perfecta Paz" text and the military dog tag image are centrally aligned, using Flexbox to keep the user's focus in the middle of the screen.
* **Responsive Banner:** Include a top banner or overlay for mobile users, as the site specifically suggests visiting on a computer for a better experience (`Para una mejor experiencia, visita esta página en un computador :)`).

```css
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background-color: var(--nxt-bg-main);
  padding: var(--nxt-space-md);
}
```