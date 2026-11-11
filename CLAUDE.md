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
- The whole landing page currently lives in `src/App.jsx` as local components (`Logo`, `Header`, `Hero`, `Features`, `Footer`). The data arrays at the top of the file (`navLinks`, `features`) drive the nav and feature cards. The `navLinks` array is shared by the desktop nav, the mobile menu and the footer.
- Navigation uses in-page anchors (`#funktioner`, `#om`, `#priser`, `#kontakt`), not a router. Only `#funktioner` (Features) and `#kontakt` (Footer) have matching sections so far.
- Styling is done entirely with Tailwind utility classes inline. Icons are inline SVG `<path>` elements; there is no icon library.
- `src/assets/` holds leftover files from the Vite template that `App.jsx` does not import.

## Conventions

- Always respond to the user in Danish.
- All user-facing text is in Danish.
- Style only with Tailwind utility classes. Do not create separate CSS files; `src/index.css` is the single CSS entry point (the Tailwind import plus any `@theme` tokens).
