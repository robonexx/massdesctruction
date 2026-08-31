'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MdLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      if (result.ok) {
        router.push('/md-admin');
        return;
      }
    } catch {
      // The server is the only authority for admin credentials.
    }

    setError('Fel användarnamn eller lösenord.');
  };

  return (
    <main className="page-shell" style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#171717', border: '1px solid rgba(255,255,255,0.15)', padding: 32 }}>
        <h1 style={{ marginBottom: 24, letterSpacing: '0.2em', textTransform: 'uppercase' }}>MD Login</h1>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Användarnamn</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: 12, background: '#0c0c0c', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Lösenord</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 12, background: '#0c0c0c', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} />
          </label>
          {error && <p style={{ color: '#ff9a9a', margin: 0 }}>{error}</p>}
          <button type="submit" style={{ padding: '14px 16px', background: '#b51d1d', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Logga in</button>
        </form>
      </div>
    </main>
  );
}
