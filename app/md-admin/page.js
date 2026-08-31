'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const normalizeNews = (value) => {
  if (!Array.isArray(value)) return [];
  return value;
};

const readLocalJson = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
};

export default function MdAdminPage() {
  const router = useRouter();
  const [news, setNews] = useState(() => readLocalJson('massdestruction_news', []));
  const [guestbook, setGuestbook] = useState(() => readLocalJson('massdestruction_guestbook', []));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [text, setText] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const sessionResponse = await fetch('/api/admin/session');
        if (!sessionResponse.ok) {
          router.replace('/md-login');
          return;
        }

        const [newsResponse, guestbookResponse] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/guestbook'),
        ]);

        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          if (Array.isArray(newsData)) setNews(newsData);
          localStorage.setItem('massdestruction_news', JSON.stringify(newsData));
        }

        if (guestbookResponse.ok) {
          const guestbookData = await guestbookResponse.json();
          if (Array.isArray(guestbookData)) setGuestbook(guestbookData);
          localStorage.setItem('massdestruction_guestbook', JSON.stringify(guestbookData));
        }
      } catch (error) {
        console.warn('Failed to load admin data', error);
      }
    };

    loadData();
  }, [router]);

  useEffect(() => {
    localStorage.setItem('massdestruction_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('massdestruction_guestbook', JSON.stringify(guestbook));
  }, [guestbook]);

  const addNews = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setStatus({ type: '', message: '' });

    const nextEntry = {
      date,
      n: text.trim(),
    };

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextEntry),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Nyheten kunde inte publiceras.');

      setNews((current) => [result, ...normalizeNews(current)]);
      setText('');
      setStatus({ type: 'success', message: 'Nyhet publicerad på startsidan.' });
    } catch (error) {
      console.warn('News API save failed.', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nyheten kunde inte publiceras.',
      });
    }
  };

  const removeGuestbook = async (id) => {
    if (!id) return;

    try {
      const response = await fetch(`/api/guestbook?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (response.ok) {
        setGuestbook((current) => current.filter((entry) => entry.id !== id));
        return;
      }
    } catch (error) {
      console.warn('Guestbook delete API failed, removing locally instead.', error);
    }

    setGuestbook((current) => current.filter((entry) => entry.id !== id));
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/md-login');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#111', color: '#f4f4f4', padding: '2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>MD Admin</h1>
          <button onClick={logout} style={{ padding: '0.75rem 1rem', background: '#444', color: '#fff', border: 'none', cursor: 'pointer' }}>Logga ut</button>
        </header>

        <section style={{ background: '#1d1d1d', border: '1px solid #444', padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Lägg till nyhet</h2>
          <form onSubmit={addNews} style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span>Datum</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} style={{ padding: '0.8rem', background: '#000', border: '1px solid #666', color: '#fff' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span>Text</span>
              <textarea value={text} onChange={(event) => setText(event.target.value)} rows={4} style={{ padding: '0.8rem', background: '#000', border: '1px solid #666', color: '#fff', resize: 'vertical' }} />
            </label>
            <button type="submit" style={{ padding: '0.9rem 1.2rem', background: '#b61d1d', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Publicera nyhet</button>
            {status.message && <p role="status" style={{ margin: 0, color: status.type === 'error' ? '#ff9b9b' : '#a5f3a5' }}>{status.message}</p>}
          </form>
        </section>

        <section style={{ background: '#1d1d1d', border: '1px solid #444', padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Gästbok</h2>
          {guestbook.length === 0 ? (
            <p>Inga inlägg ännu.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {guestbook.map((entry) => (
                <article key={entry.id || `${entry.name}-${entry.date}`} style={{ border: '1px solid #555', padding: '1rem', background: '#151515' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <strong>{entry.name}</strong>
                    <small>{entry.date} · {entry.time}</small>
                  </div>
                  <p style={{ margin: '0.75rem 0' }}>{entry.message}</p>
                  <button onClick={() => removeGuestbook(entry.id)} style={{ background: '#7a1d1d', color: '#fff', border: 'none', padding: '0.6rem 0.9rem', cursor: 'pointer' }}>Ta bort</button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
