import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid #eee', marginBottom: 20 }}>
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <div style={{ marginLeft: 'auto' }}>
            <Link href="/products">Products</Link>
          </div>
        </nav>
      </header>
      <main style={{ padding: 16 }}>{children}</main>
      <footer style={{ padding: 16, borderTop: '1px solid #eee', marginTop: 40, textAlign: 'center' }}>
        Minimal Next.js e‑com starter
      </footer>
    </div>
  );
}
