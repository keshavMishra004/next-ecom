import { useState, useEffect } from 'react';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: 0, inventory: 0, category: '' });
  const ADMIN_KEY = typeof window !== 'undefined' ? (window.ADMIN_KEY || '') : '';

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);

  async function createProduct(e) {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
      body: JSON.stringify({ ...form, price: Number(form.price), inventory: Number(form.inventory) })
    });
    if (res.ok) {
      const p = await res.json();
      setProducts(prev => [...prev, p]);
      setForm({ name: '', price: 0, inventory: 0, category: '' });
    } else {
      alert('Create failed');
    }
  }

  async function updateInventory(id, newInv) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
      body: JSON.stringify({ inventory: Number(newInv) })
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
    } else alert('Update failed');
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel (Client-side)</h1>
      <p>Add products using the form below. Provide ADMIN_KEY in runtime (see README).</p>

      <form onSubmit={createProduct}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input placeholder="Inventory" type="number" value={form.inventory} onChange={e => setForm({...form, inventory: e.target.value})} required />
        <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        <button type="submit">Create</button>
      </form>

      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — inv: {p.inventory}
            <button onClick={() => updateInventory(p.id, p.inventory + 1)}>+1</button>
            <button onClick={() => updateInventory(p.id, p.inventory - 1)}>-1</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
