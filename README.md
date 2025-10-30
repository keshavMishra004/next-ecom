# Next.js E-commerce Starter

Name: Keshav Mishra
Date: 31-10-2025

Run:
1. Copy .env.example to .env and set ADMIN_KEY.
2. npm install
3. npm run dev
4. Open http://localhost:3000

Pages and rendering:
- / (Home) — SSG via getStaticProps; client-side filtering.
- /products/[slug] — SSG + ISR (revalidate: 60) via getStaticPaths/getStaticProps.
- /dashboard — SSR via getServerSideProps (always fresh inventory).
- /admin — Client-side fetching to POST/PUT admin API routes.

API:
- GET /api/products
- GET /api/products/[slug]
- POST /api/products (requires X-ADMIN-KEY header)
- PUT /api/products/[id] (requires X-ADMIN-KEY header)

Data:
- Stored in data/products.json for easy local development.

Notes:
- This is a minimal starter to demonstrate SSG/ISR/SSR/client fetching and simple API routes.
