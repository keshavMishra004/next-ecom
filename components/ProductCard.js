import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="card">
      <h3>{product.name}</h3>
      <p className="muted">{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
      <p className="muted">In stock: {product.inventory}</p>

      <style jsx>{`
        .card {
          display: block;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          padding: 12px;
          transition: box-shadow .12s ease;
          color: inherit;
          text-decoration: none;
        }
        .card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
        .muted { color: #666; font-size: 0.9em; margin: 4px 0; }
      `}</style>
    </Link>
  );
}
