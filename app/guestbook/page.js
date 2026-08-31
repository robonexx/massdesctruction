'use client';

import { useEffect, useState } from 'react';
import ArchivePage from '../components/ArchivePage';
import './guestbook.css';

export default function GuestbookPage() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/guestbook')
      .then((response) => response.ok ? response.json() : [])
      .then((data) => setEntries(Array.isArray(data) ? data : []))
      .catch(() => setNotice('Gästboken kunde inte hämtas.'));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setNotice('');
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setEntries((current) => [result, ...current]);
      setName('');
      setMessage('');
      setNotice('Ditt meddelande är publicerat.');
    } catch {
      setNotice('Meddelandet kunde inte sparas. Kontrollera MongoDB-konfigurationen.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ArchivePage title="GUESTBOOK" eyebrow="Leave a trace" background="guestbook">
      <p className="archive-lead">Write a message and keep the spirit of Mass Destruction alive.</p>
      <div className="guestbook-layout">
        <form className="guestbook-form" onSubmit={handleSubmit}>
          <label>Namn<input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} required /></label>
          <label>Meddelande<textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={6} maxLength={800} required /></label>
          <button type="submit" disabled={submitting}>{submitting ? 'Sparar…' : 'Skriv i gästboken'}</button>
          {notice && <p className="form-notice" role="status">{notice}</p>}
        </form>
        <section className="guestbook-entries" aria-label="Gästboksinlägg">
          {entries.length === 0 ? <p className="guestbook-empty">Inga inlägg ännu.</p> : entries.map((entry) => (
            <article className="guestbook-entry" key={entry.id || `${entry.name}-${entry.date}-${entry.time}`}>
              <header><strong>{entry.name}</strong><time>{entry.date} · {entry.time}</time></header>
              <p>{entry.message}</p>
            </article>
          ))}
        </section>
      </div>
    </ArchivePage>
  );
}
