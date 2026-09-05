# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static, single-page personal portfolio site for Pooriya Ketabi (pooriya.dev). Plain HTML/CSS/JS — no framework, no bundler, no package.json, no build step. Deployed via GitHub Pages (custom domain via `CNAME`).

## Development

There is no build/lint/test tooling in this repo. To work on it locally, just serve the static files and open in a browser:

```bash
# any static server works, e.g.
npx serve .
# or use the VS Code "Live Server" extension (port is pinned in .vscode/settings.json to 5502)
```

Changes take effect on a browser refresh — no compile/transpile step. Because a service worker (`service-worker.js`) caches core assets, do a hard refresh (or unregister the SW / use an incognito window) when testing changes to `index.html`, `style.css`, or `main.js`, otherwise stale cached versions may be served.

## Architecture

Everything lives in three top-level files plus static assets:

- **[index.html](index.html)** — single-page markup for all sections (`#hero`, `#about`, `#skills`, `#projects`, `#resume`, `#contact`). All text is hardcoded in English (no i18n).
- **[main.js](main.js)** — all page behavior, loaded as a single `DOMContentLoaded` handler:
  - **Theme toggle**: adds/removes `dark` class on `<body>`, persisted to `localStorage` under key `mode`.
  - **Typewriter effect**: on load, captures the hero `<h1 class="typewriter">`'s existing text, clears it, and retypes it character by character.
  - **Projects**: rendered from a hardcoded `pinnedProjects` array in `main.js` (name, tech icon list, description, `github`/`demo`/optional `website` links) into `.projects-container`. This list is intentionally curated to mirror the flagship projects on the CV/LinkedIn — don't pad it back out with every old practice repo.
  - **Contact form**: submits via `fetch` to a Formspree endpoint (hardcoded form `action` in `index.html`), with client-side required-field/email validation before submit, and inline success/error messaging.
  - **Calendly**: booking link opens the Calendly popup widget instead of navigating away.
  - **ScrollReveal**: scroll-in animations applied to each section and card.
  - Registers `service-worker.js` for PWA/offline support.
- **[style.css](style.css)** — all styling, using CSS custom properties in `:root` for theme colors (light/dark handled via `body.dark` overrides) and a glassmorphism aesthetic (blurred translucent backgrounds).

Supporting files:
- **[manifest.json](manifest.json)** / **[service-worker.js](service-worker.js)** — PWA manifest and cache-first service worker; `urlsToCache` must be kept in sync if core file names change.
- **[icons/](icons/)** — favicons, PWA icons, logo variants.
- **[assets/](assets/)** — downloadable CV/resume files linked from the Resume section, and OG/preview images. There are several old CV file variants in this folder; the one currently linked from `index.html`'s download button is `assets/POORIYA KETABI CV.pdf`.
- **CNAME** — GitHub Pages custom domain (`pooriya.dev`); `index.html` also has an inline redirect from `www.pooriya.dev` to the bare domain.

## External dependencies (all via CDN, no local install)

- Google Fonts (Inter)
- Font Awesome (icons)
- Devicon (tech-stack icons)
- ScrollReveal (scroll animations)
- Calendly widget (meeting booking popup)
- Formspree (contact form backend)
