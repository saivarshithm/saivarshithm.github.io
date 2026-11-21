# Silicon & Software Portfolio Web Platform

A high-performance static web application engineered with Astro 5, React 19, Tailwind CSS v4, and GSAP. Tailored for hardware-software systems engineering, digital silicon design, and developer tools.

## Architecture

- **Core Framework:** Astro 5 Static Site Generation (SSG)
- **Interactive Islands:** React 19 and TypeScript
- **Styling:** Tailwind CSS v4 semantic design tokens
- **Motion:** GSAP hardware-accelerated animations
- **Signal Visualizer:** HTML5 Canvas 60fps oscilloscope and PWM synthesizer
- **Live Sync:** Client-side GitHub REST API repository sync with session caching

## Key Features

- **Live Oscilloscope Widget:** Real-time waveform canvas with configurable frequency, duty cycle, and calculated filter metrics.
- **Bento Project Grid:** Asymmetric grid layout with mode filtering and cursor spotlight highlights.
- **Repository Explorer:** Live synchronization with GitHub API, smart category tagging, and search filters.
- **Command Menu:** Keyboard-driven modal (`Ctrl+K` / `Cmd+K`) for fast navigation and actions.
- **Mobile Dock:** Bottom glass navigation bar optimized for touch targets and device safe areas.

## Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/saivarshithm/saivarshithm.github.io.git
cd saivarshithm.github.io

# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

### Building for Production

```bash
pnpm run build
```

Build outputs are generated in the `dist/` directory, ready for deployment on GitHub Pages or any static host.

## Project Structure

```text
├── public/               # Static assets and .nojekyll
├── src/
│   ├── components/       # React interactive islands & UI components
│   ├── data/             # Centralized project & repository configuration
│   ├── layouts/          # Astro base layout and metadata
│   ├── pages/            # Astro route pages
│   └── styles/           # Global styles and Tailwind CSS v4 theme
├── astro.config.mjs      # Astro configuration
└── package.json          # Dependencies and scripts
```

## License

This project is open source and available under the MIT License.
