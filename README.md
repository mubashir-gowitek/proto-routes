# HTML Routes

A small React + Vite app that mounts standalone HTML prototypes under React Router routes via `<iframe>`. Each prototype keeps its own scripts and styles isolated, so they "just work" without any modification.

## Current routes

| Route                         | File                                       |
| ----------------------------- | ------------------------------------------ |
| `/`                           | Index of all available prototypes          |
| `/nexusai-rfp`                | `public/pages/nexusai-rfp.html`            |
| `/fenix-fleet-operations`     | `public/pages/fenix-fleet-operations.html` |

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://localhost:5173).

## Adding a new prototype

1. Drop the `.html` file into `public/pages/`.
2. Add an entry to `src/routes.js`:

   ```js
   {
     path: '/your-route',
     file: '/pages/your-file.html',
     title: 'Display title',
     description: 'Optional one-liner for the home grid.',
   }
   ```

3. The route is now available and is listed on the home page.

## How it works

- `src/routes.js` is the single source of truth — a list of `{ path, file, title }` entries.
- `src/App.jsx` iterates that list and creates a `<Route>` per entry, each rendering `src/components/HtmlPage.jsx`.
- `HtmlPage` is just a full-viewport `<iframe>` pointed at the file in `public/pages/`. Because files in `public/` are served at the site root, the iframe gets the original page exactly as authored.
- `src/pages/Home.jsx` reads the same list and renders the landing index, so you never have to update navigation manually.

## Build

```bash
npm run build
npm run preview
```

The HTML prototypes in `public/pages/` are copied verbatim into `dist/pages/` at build time.
