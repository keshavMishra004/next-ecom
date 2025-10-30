const { readProducts, writeProducts } = require('../../../lib/db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await readProducts();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const body = req.body;
    if (!body || !body.name || typeof body.price !== 'number') {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    const products = await readProducts();
    const id = Date.now().toString();
    const slug = (body.slug || body.name).toLowerCase().replace(/\s+/g, '-');
    const newProduct = {
      id,
      name: body.name,
      slug,
      description: body.description || '',
      price: body.price,
      category: body.category || 'Uncategorized',
      inventory: typeof body.inventory === 'number' ? body.inventory : 0,
      lastUpdated: new Date().toISOString()
    };
    products.push(newProduct);
    await writeProducts(products);
    return res.status(201).json(newProduct);
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end('Method Not Allowed');
}
