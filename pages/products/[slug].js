import { readProducts } from '../../lib/db';

export async function getStaticPaths() {
  const products = await readProducts();
  const paths = products.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: 'blocking' }; // allow on-demand generation
}

export async function getStaticProps({ params }) {
  const products = await readProducts();
  const product = products.find(p => p.slug === params.slug);
  if (!product) return { notFound: true };
  return {
    props: { product },
    revalidate: 60 // ISR every 60 seconds
  };
}

export default function ProductPage({ product }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Inventory:</strong> {product.inventory}</p>
    </div>
  );
}
