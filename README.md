# Kyle Holiday

Personal site for [Kyle Holiday](https://kyleholiday.com) — leather, play, and art in Los Angeles.

Built with Vite, React, and TypeScript.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Import this repo in [Vercel](https://vercel.com/new).
2. Framework preset: **Vite** (or use the included `vercel.json`).
3. Add custom domain **kyleholiday.com** in Project → Settings → Domains.
4. Point DNS at your registrar (Bluehost):
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`

Pushes to `main` deploy automatically once connected.
