'use client';

import { useEffect, useState } from 'react';
import ArchivePage from '../components/ArchivePage';
import './guestbook.css';

const EDIT_KEYS_STORAGE = 'massdestruction_guestbook_edit_keys';

function readEditKeys() {
  try {
    return JSON.parse(localStorage.getItem(EDIT_KEYS_STORAGE) || '{}');
  } catch {
    return {};
  }
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editKeys, setEditKeys] = useState({});
  const [editingId, setEditingId] = useState('');
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');

  useEffect(() => {
    const now = Date.now();
    const activeKeys = Object.fromEntries(
      Object.entries(readEditKeys()).filter(([, value]) => value?.token && new Date(value.expiresAt).getTime() > now),
    );
    setEditKeys(activeKeys);
    localStorage.setItem(EDIT_KEYS_STORAGE, JSON.stringify(activeKeys));
  }, []);

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
      const { editToken, editableUntil, ...entry } = result;
      setEntries((current) => [entry, ...current]);
      const nextKeys = { ...editKeys, [entry.id]: { token: editToken, expiresAt: editableUntil } };
      setEditKeys(nextKeys);
      localStorage.setItem(EDIT_KEYS_STORAGE, JSON.stringify(nextKeys));
      setName('');
      setMessage('');
      setNotice('Ditt meddelande är publicerat.');
    } catch {
      setNotice('Meddelandet kunde inte sparas. Kontrollera MongoDB-konfigurationen.');
    } finally {
      setSubmitting(false);
    }
  };

  const beginEditing = (entry) => {
    setEditingId(entry.id);
    setEditName(entry.name);
    setEditMessage(entry.message);
    setNotice('');
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    const key = editKeys[editingId];
    if (!key) return;
    setSubmitting(true);
    setNotice('');
    try {
      const response = await fetch('/api/guestbook', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          editToken: key.token,
          name: editName,
          message: editMessage,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setEntries((current) => current.map((entry) => entry.id === editingId ? result : entry));
      setEditingId('');
      setNotice('Ditt inlägg är uppdaterat.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Inlägget kunde inte uppdateras.');
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
              {editingId === entry.id ? (
                <form className="guestbook-edit-form" onSubmit={saveEdit}>
                  <label>Namn<input value={editName} onChange={(event) => setEditName(event.target.value)} maxLength={60} required /></label>
                  <label>Meddelande<textarea value={editMessage} onChange={(event) => setEditMessage(event.target.value)} rows={5} maxLength={800} required /></label>
                  <div className="guestbook-actions">
                    <button type="submit" disabled={submitting}>Spara</button>
                    <button type="button" onClick={() => setEditingId('')}>Avbryt</button>
                  </div>
                </form>
              ) : (
                <>
                  <header><strong>{entry.name}</strong><time>{entry.date} · {entry.time}</time></header>
                  <p>{entry.message}</p>
                  {editKeys[entry.id] && <button className="guestbook-edit-button" type="button" onClick={() => beginEditing(entry)}>Ändra</button>}
                </>
              )}
            </article>
          ))}
        </section>
      </div>
    </ArchivePage>
  );
}
