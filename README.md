# proto-routes

A small React + Vite app that mounts standalone HTML prototypes under React Router routes via `<iframe>`. Each prototype keeps its own scripts and styles isolated, so they "just work" without any modification.

**Live URL pattern (production):** `http://YOUR_SERVER_IP/proto-routes/<route>`

---

## Contents

- [Current routes](#current-routes)
- [Local development](#local-development)
- [Adding a new prototype](#adding-a-new-prototype)
- [How it works](#how-it-works)
- [Production build](#production-build)
- [Deployment (nginx, sub-path on IP)](#deployment-nginx-sub-path-on-ip)
- [Re-deploying after changes](#re-deploying-after-changes)
- [Common operations cheat sheet](#common-operations-cheat-sheet)
- [Troubleshooting](#troubleshooting)

---

## Current routes

| Route                      | File                                       |
| -------------------------- | ------------------------------------------ |
| `/`                        | Index of all available prototypes          |
| `/nexusai-rfp`             | `public/pages/nexusai-rfp.html`            |
| `/fenix-fleet-operations`  | `public/pages/fenix-fleet-operations.html` |
| `/wine-industry`           | `public/pages/wine-industry.html`          |

---

## Local development

```bash
npm install
npm run dev
```

Then open the URL Vite prints. Because the production base path is `/proto-routes/`, the local URL is also under that sub-path: **http://localhost:5173/proto-routes/**

---

## Adding a new prototype

Three steps, no router edits:

1. Drop the `.html` file into `public/pages/` (e.g. `public/pages/my-thing.html`).
2. Add an entry to `src/routes.js`:

   ```js
   {
     path: '/my-thing',
     file: '/pages/my-thing.html',
     title: 'My Thing — Some Subtitle',
     description: 'Optional one-liner for the home grid.',
   }
   ```

3. It now appears on the home page and is reachable at `/my-thing` (locally: `http://localhost:5173/proto-routes/my-thing`; in prod: `http://YOUR_IP/proto-routes/my-thing`).

Then commit, push, and re-deploy (see [Re-deploying after changes](#re-deploying-after-changes)).

---

## How it works

- **`src/routes.js`** is the single source of truth — a list of `{ path, file, title, description }` entries. Both the router and the home-page index read this list, so navigation never needs manual updates.
- **`src/App.jsx`** iterates that list and creates a `<Route>` per entry, each rendering `src/components/HtmlPage.jsx`.
- **`HtmlPage`** is a full-viewport `<iframe>` pointed at the file under `public/pages/`. The iframe isolates the prototype's `<head>`, CSS, and scripts from the React shell. The `src` is prefixed with `import.meta.env.BASE_URL` so it works under any deploy sub-path.
- **`src/pages/Home.jsx`** auto-renders the landing card grid from the same list.
- **Sub-path support** — `vite.config.js` sets `base: '/proto-routes/'` so all built assets are emitted with that prefix. `src/main.jsx` derives the React Router `basename` from `import.meta.env.BASE_URL`. As a result, the same code runs at `/proto-routes/` in dev and in prod with no per-environment branching.

To change the sub-path, edit the `BASE_PATH` default in `vite.config.js`, or build with `VITE_BASE=/new-path/ npm run build`. The nginx `location` block has to match.

---

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally to verify
```

`dist/` is a fully static folder. Layout:

```
dist/
├── index.html
├── assets/         ← bundled JS + CSS (hashed filenames)
├── pages/          ← copied verbatim from public/pages/
├── favicon.svg
└── icons.svg
```

All asset URLs inside `dist/index.html` are prefixed with `/proto-routes/` to match the deploy sub-path.

---

## Deployment (nginx, sub-path on IP)

Target environment: the existing nginx `default` site on port 80 serves at the server's IP. We mount this app at `http://YOUR_IP/proto-routes/`. The other apps already on the box (`/` and `:8080` and `ai.gowitek.com`) are untouched.

### One-time server setup

SSH into the server interactively and prepare the destination directory (owned by your SSH user so future `rsync`s don't need sudo):

```bash
ssh USER@YOUR_IP
sudo mkdir -p /var/www/proto-routes
sudo chown -R $USER:$USER /var/www/proto-routes
exit
```

### One-time nginx config

On the server, edit the **default** site:

```bash
sudo nano /etc/nginx/sites-available/default
```

Add the `location /proto-routes/` block inside the existing `server { ... }` (alongside the current `location /`):

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    root /var/www/seritization;
    index index.html;

    # proto-routes React SPA mounted at /proto-routes/
    location /proto-routes/ {
        alias /var/www/proto-routes/;
        index index.html;
        try_files $uri $uri/ /proto-routes/index.html;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

Why `alias` (not `root`): `alias` strips the `/proto-routes/` prefix before mapping to the filesystem, so `/proto-routes/assets/foo.js` → `/var/www/proto-routes/assets/foo.js`. The `try_files … /proto-routes/index.html` fallback makes React Router deep links (e.g. `/proto-routes/nexusai-rfp`) reload correctly.

Test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### (Optional but recommended) Passwordless SSH

The server uses password auth by default. To stop typing the password on every deploy, set up a key once:

```bash
# On your Mac, create a key if you don't have one
ls ~/.ssh/id_ed25519.pub 2>/dev/null || ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519

# Push the public key to the server (one-time password prompt)
ssh-copy-id USER@YOUR_IP

# Verify
ssh USER@YOUR_IP "echo ok"
```

After this, `ssh`/`scp`/`rsync` to that server are passwordless.

### First deploy

```bash
cd /Users/mubashir/Desktop/html-routes-app
npm run build
rsync -avz --delete dist/ USER@YOUR_IP:/var/www/proto-routes/
```

Verify from your Mac:

```bash
curl -I http://YOUR_IP/proto-routes/
curl -I http://YOUR_IP/proto-routes/nexusai-rfp
curl -I http://YOUR_IP/proto-routes/pages/nexusai-rfp.html
```

All should return `200 OK`. Then open `http://YOUR_IP/proto-routes/` in a browser.

---

## Re-deploying after changes

After any code change or new prototype:

```bash
cd /Users/mubashir/Desktop/html-routes-app
npm run build
rsync -avz --delete dist/ USER@YOUR_IP:/var/www/proto-routes/
```

No nginx reload needed — only static files changed. Re-deploys take seconds because `rsync` only ships diffs.

`--delete` removes server-side files that no longer exist locally (keeps `/var/www/proto-routes/` in sync with `dist/`). Safe because nothing else lives in that directory.

---

## Common operations cheat sheet

```bash
# Run locally
npm run dev

# Build production
npm run build

# Preview production build locally
npm run preview

# Deploy (after build)
rsync -avz --delete dist/ USER@YOUR_IP:/var/www/proto-routes/

# Build + deploy in one go
npm run build && rsync -avz --delete dist/ USER@YOUR_IP:/var/www/proto-routes/

# Build with a different sub-path (one-off)
VITE_BASE=/some-other-path/ npm run build

# Tail nginx logs on the server
ssh USER@YOUR_IP "sudo tail -f /var/log/nginx/error.log /var/log/nginx/access.log"

# Check what's deployed on the server
ssh USER@YOUR_IP "ls -la /var/www/proto-routes/ /var/www/proto-routes/pages/"
```

---

## Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Hard refresh of `/proto-routes/<route>` returns 404 | `try_files … /proto-routes/index.html;` is missing or wrong in the nginx `location` block. |
| Page loads but assets are 404 (blank/unstyled) | `vite.config.js` `base` doesn't match the nginx `location` path. They must agree (both `/proto-routes/`). |
| Iframe page is blank | The `file` in `src/routes.js` doesn't match a file in `public/pages/`. Check spelling/case. |
| `nginx -t` fails after editing default site | Look for missing `;`, an unmatched `}`, or a duplicated `location` block. Output points to the line. |
| `rsync` says "Permission denied" writing to `/var/www/...` | The one-time `chown` step didn't run, or you re-created the folder as root. Re-run the `chown` step. |
| Two apps on the same port (`address already in use`) | Both site configs try to `listen 80 default_server`. Only one site can be `default_server`. |
| Browser caches old JS after deploy | Vite outputs hashed filenames, so this is rare. If it happens, hard-reload (Cmd+Shift+R) or check the `Cache-Control` header set by nginx. |

---

## Server context (for reference)

The server hosts other apps already (per the captured nginx config snapshot):

| Site config | Port | Hostname | Doc root |
| --- | --- | --- | --- |
| `default` (this app lives here) | 80 (default_server) | `_` (IP / any host) | `/var/www/seritization` |
| `nexus-ai` | 8080 | (IP) | `/var/www/nexus-ai` |
| `ai-maturity` | 443 (SSL) | `ai.gowitek.com` | `/var/www/ai-maturity-assessment/frontend/build` |

This app coexists at `/proto-routes/` under the `default` site — it only adds a new `location` block and a new folder under `/var/www/`.

---

## File layout (key files)

```
proto-routes/
├── public/
│   └── pages/                          ← raw HTML prototypes (verbatim)
│       ├── nexusai-rfp.html
│       ├── fenix-fleet-operations.html
│       └── wine-industry.html
├── src/
│   ├── App.jsx                         ← router wire-up (maps routes.js → <Route>)
│   ├── main.jsx                        ← BrowserRouter basename from BASE_URL
│   ├── routes.js                       ← THE LIST OF PROTOTYPES (edit this)
│   ├── components/
│   │   └── HtmlPage.jsx                ← full-viewport iframe wrapper
│   └── pages/
│       ├── Home.jsx                    ← auto-generated index
│       └── NotFound.jsx
├── vite.config.js                      ← sets base to /proto-routes/
└── index.html                          ← Vite entry shell
```
