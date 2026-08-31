'use client';

import { useEffect, useState } from 'react';

export default function GuestbookPage() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch('/api/guestbook');
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data)) setEntries(data);
      } catch (error) {
        console.warn('Could not load guestbook entries', error);
      }
    };

    loadEntries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const payload = {
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('sv-SE'),
      time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save guestbook entry');

      const created = await response.json();
      setEntries((current) => [created, ...current]);
      setName('');
      setMessage('');
      setNotice('Ditt meddelande är nu publicerat.');
    } catch (error) {
      console.warn('Guestbook save failed', error);
      setNotice('Något gick fel. Försök igen.');
    }
  };

  return (
    <main className="page-shell" style={{ display: 'grid', gap: '2rem' }}>
      <section style={{ maxWidth: 1000, margin: '0 auto', width: '100%', display: 'grid', gap: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.14)', padding: '2rem' }}>
          <p className="eyebrow">Guestbook</p>
          <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2rem, 4vw, 4rem)', textTransform: 'uppercase' }}>Leave a trace</h1>
          <p style={{ margin: 0, color: '#d9d9d9', lineHeight: 1.8 }}>
            Write a message and keep the spirit of Mass Destruction alive.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.14)', padding: '2rem', display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span>Namn</span>
            <input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} style={{ padding: '0.9rem', background: '#0c0c0c', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} required />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span>Meddelande</span>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={5} maxLength={800} style={{ padding: '0.9rem', background: '#0c0c0c', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', resize: 'vertical' }} required />
          </label>
          <button type="submit" style={{ padding: '1rem 1.2rem', background: '#bb1f1f', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Skriv i gästboken</button>
          {notice && <p style={{ margin: 0, color: '#a5f3a5' }}>{notice}</p>}
        </form>

        <section style={{ display: 'grid', gap: '1rem' }}>
          {entries.length === 0 ? (
            <p style={{ margin: 0, color: '#d9d9d9' }}>Inga inlägg ännu.</p>
          ) : (
            entries.map((entry) => (
              <article key={entry.id || `${entry.name}-${entry.date}-${entry.time}`} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.14)', padding: '1.25rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <strong>{entry.name}</strong>
                  <time style={{ color: '#ffb0b0' }}>{entry.date} · {entry.time}</time>
                </header>
                <p style={{ margin: 0, color: '#d9d9d9', lineHeight: 1.8 }}>{entry.message}</p>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}
