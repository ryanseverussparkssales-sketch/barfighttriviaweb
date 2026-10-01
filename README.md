# Bar Fight Trivia — Nashville

One-page SvelteKit site (JS, Svelte 5, static build).

## Edit content

Everything — venues, nights, hosts, rounds, rules, champs, FAQ, contact — lives in **`src/lib/content.js`**.
Lines marked `// TODO` are placeholders to swap for real info. No other file needs touching for content updates.

The booking form opens the visitor's email app pre-filled and addressed to `site.email`. No backend needed.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # static site written to /build
```

## Deploy (Vercel + Squarespace domain)

1. Push to GitHub, import the repo in Vercel (framework auto-detected, output is `build`). Or from this folder: `npx vercel deploy --prod`.
2. Vercel → Project → Settings → Domains: add `yourdomain.com` and `www.yourdomain.com`.
3. Squarespace → Domains → DNS: remove the Squarespace Defaults preset (keep any email MX/TXT records), then add
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
   (Use whatever values Vercel's Domains panel shows if they differ.)
