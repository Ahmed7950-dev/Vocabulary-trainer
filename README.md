# New Language Challenges — PWA

## What's in this folder

```
nlc-pwa/
  index.html      ← the full app
  manifest.json   ← PWA metadata (name, icons, colors)
  sw.js           ← service worker (offline caching)
  favicon.ico     ← browser tab icon
  icons/          ← app icons in all required sizes
  README.md       ← this file
```

---

## How to install on your iPhone (no App Store needed)

You need to serve the files over HTTPS — Safari won't install PWAs from a local file.
The easiest free option is **GitHub Pages**.

### Step 1 — Upload to GitHub Pages (free, 5 minutes)

1. Go to https://github.com and create a free account if you don't have one.
2. Click **New repository**. Name it anything, e.g. `nlc-app`. Make it **Public**.
3. Upload all the files in this folder (index.html, manifest.json, sw.js, favicon.ico, and the entire `icons/` folder) to the repository root.
4. Go to **Settings → Pages**, set source to **Deploy from a branch → main → / (root)**, click Save.
5. After ~60 seconds, your app is live at: `https://YOUR-USERNAME.github.io/nlc-app/`

### Step 2 — Add to iPhone home screen

1. Open Safari on your iPhone (must be Safari — Chrome on iOS won't install PWAs).
2. Go to your GitHub Pages URL above.
3. Tap the **Share** button (the box with an arrow pointing up).
4. Scroll down and tap **"Add to Home Screen"**.
5. Give it a name (e.g. "NLC") and tap **Add**.

The app now appears on your home screen with its icon, opens fullscreen with no browser bar, and works completely offline after the first load.

---

## How to update the app

1. Edit `index.html` on your computer.
2. Upload the new version to your GitHub repository (drag and drop in the browser, or use git).
3. GitHub Pages deploys automatically in about 60 seconds.
4. On your iPhone, open the app and pull down to refresh — the service worker picks up the new version.

To force the service worker to update immediately, bump the version in `sw.js`:
```js
const CACHE_NAME = 'nlc-v2'; // change v1 → v2
```

---

## Alternative hosting options

- **Netlify** (netlify.com) — drag and drop the whole folder, instant HTTPS URL. Free tier is generous.
- **Cloudflare Pages** — similar to Netlify, very fast.
- **Your own server** — any HTTPS server works. The service worker requires HTTPS (localhost is the only exception).

---

## Troubleshooting

**"Add to Home Screen" doesn't appear**
Make sure you're using Safari (not Chrome or Firefox) on iOS. The option only appears in Safari.

**App doesn't work offline**
The service worker caches assets on first load. Open the app once while online, then try offline.

**Changes aren't showing after update**
Close and reopen the app, or go to Safari → address bar, type the URL, and hard reload.
