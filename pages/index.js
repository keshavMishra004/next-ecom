// Run instructions:
// 1) Open terminal and cd to d:\next assesm
// 2) Copy .env.example -> .env and set ADMIN_KEY=your_admin_key (and MONGODB_URI if used)
// 3) npm install
// 4) npm run dev
//  - Dev server serves both frontend and backend API at http://localhost:3000
//  - API endpoints: GET /api/products, GET /api/products/[slug], POST /api/products (x-admin-key), PUT /api/products/[id] (x-admin-key)
// 5) To use Admin page in-browser set the client key (one-time) in console:
//    window.ADMIN_KEY = 'your_admin_key'
// 6) Production: npm run build && npm start (ensure env vars present)
//
// ...existing code...
import { readProducts } from '../lib/db';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export async function getStaticProps() {
  const products = await readProducts();
  return { props: { products } }; // SSG
}

export default function Home({ products }) {
  const [q, setQ] = useState('');
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <h1>Product Catalog (SSG)</h1>
      <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
      <div className="grid" style={{ marginTop: 12 }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
