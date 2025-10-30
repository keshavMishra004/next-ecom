const { readProducts, writeProducts } = require('../../../lib/db');

export default async function handler(req, res) {
  const { id } = req.query; // may be numeric id or slug string

  if (req.method === 'GET') {
    const products = await readProducts();
    const product = products.find(p => p.id === id || p.slug === id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(product);
  }

  if (req.method === 'PUT') {
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const body = req.body;
    const products = await readProducts();
    const idx = products.findIndex(p => p.id === id || p.slug === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });

    const existing = products[idx];
    const updated = {
      ...existing,
      ...body,
      lastUpdated: new Date().toISOString()
    };
    products[idx] = updated;
    await writeProducts(products);
    return res.status(200).json(updated);
  }

  res.setHeader('Allow', 'GET,PUT');
  return res.status(405).end('Method Not Allowed');
}
