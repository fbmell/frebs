# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server with HMR. `server.host: true` in `vite.config.js` binds to all interfaces so the port is reachable from Codespaces/containers.
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run lint` — Oxlint (config in `.oxlintrc.json`: `react` + `oxc` plugins, `rules-of-hooks` as error, `only-export-components` as warning)

There is no test runner and no TypeScript; the project is plain JSX.

## Stack

Vite 8 + React 19 + Tailwind CSS v4.

Tailwind v4 is wired through the `@tailwindcss/vite` plugin, not PostCSS. There is no `tailwind.config.js` and no `postcss.config.js`. `src/index.css` contains only `@import "tailwindcss";`. Theme customization goes in that CSS file using v4's `@theme` directive, not in a JS config.

## Structure

- `index.html` → `src/main.jsx` (mounts `<App />` in `StrictMode`) → `src/App.jsx`.
- The site is a tongue-in-cheek landing page for Frebs, a "premium tech" company whose product is snapping spaghetti in half so it fits in smaller pots. Dark theme (`zinc-950`) with amber as the pasta/accent colour; headings use `font-display` (Space Grotesk), body uses Inter. Both fonts load from Google Fonts in `index.html`, and `--font-*` is defined in `src/index.css`.
- `src/App.jsx` holds all page sections as local components. The content (nav, stats, features, steps, testimonials, plans) lives in data arrays at the top of the file. `navLinks` is shared by the desktop nav, the mobile menu and the footer.
- Navigation uses in-page anchors (`#teknologi`, `#om`, `#priser`, `#kontakt`) with `scroll-mt-20` to clear the sticky header. There is no router.
- `src/components/SnapDemo.jsx` is the interactive hero illustration: an SVG (viewBox 480×400) of spaghetti strands above a pot. Each strand goes `whole → snapped → fallen`. The phases are kept in a ref mirrored to state, so timeouts read current values. Each half is two nested `<g>`s: the outer one handles the translate into the pot and the inner one handles the rotation around the break point. Both animate with CSS transitions on inline `transform` styles, which use SVG user units as px. The snap sound is synthesised with the Web Audio API, so there is no audio file.
- Custom keyframe animations (`animate-crumb`, `animate-pop`, `animate-steam`, `animate-rise`) are defined inside `@theme` in `src/index.css`. To scale or rotate SVG elements around their own centre, add `[transform-box:fill-box] origin-center`.
- Icons are inline SVG `<path>` elements. There is no icon library.
- `src/assets/` holds leftover files from the Vite template that `App.jsx` does not import.

## Conventions

- Always respond to the user in Danish.
- All user-facing text is in Danish.
- Style only with Tailwind utility classes. Do not create separate CSS files; `src/index.css` is the single CSS entry point (the Tailwind import plus any `@theme` tokens).
