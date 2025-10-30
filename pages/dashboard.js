import { readProducts } from '../lib/db';

export async function getServerSideProps() {
  const products = await readProducts();
  const total = products.length;
  const lowStock = products.filter(p => p.inventory < 5).length;
  return { props: { total, lowStock, products } };
}

export default function Dashboard({ total, lowStock, products }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Inventory Dashboard (SSR)</h1>
      <p>Total products: {total}</p>
      <p>Low stock (&lt;5): {lowStock}</p>
      <h2>All products</h2>
      <ul>
        {products.map(p => <li key={p.id}>{p.name} — {p.inventory} in stock</li>)}
      </ul>
    </div>
  );
}
