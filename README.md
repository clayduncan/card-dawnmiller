# Dawn Miller Digital Business Card

A static, single-page digital business card for Dawn Miller.

This repo is the **source of truth** for the [jivo.app](https://jivo.app) card template. The same template is reused for the **Clay** and **Levi** cards.

## Layout

- `index.html` — the entire card (self-contained static page)
- `netlify.toml` — static-site config (publish repo root)
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Deployment

- **GitHub Pages** — served from the `main` branch root. The `.nojekyll` file ensures static assets are served as-is without Jekyll processing.
- **Netlify-ready** — `netlify.toml` publishes the repo root as a static site, so the repo can be deployed to Netlify with no extra configuration.
