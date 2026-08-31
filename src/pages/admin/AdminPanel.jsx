import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_USER = import.meta.env.VITE_MD_ADMIN_USER || 'robone';
const ADMIN_PASS = import.meta.env.VITE_MD_ADMIN_PASS || '1234dans';
const ADMIN_KEY = 'massdestruction_admin';
const NEWS_KEY = 'massdestruction_news';
const GUESTBOOK_KEY = 'massdestruction_guestbook';

const normalizeNews = (value) => {
  if (!Array.isArray(value) || value.length === 0) return [];
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

export const MdLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem(ADMIN_KEY) === 'true') {
      navigate('/md-admin');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem(ADMIN_KEY, 'true');
      navigate('/md-admin');
      return;
    }

    setError('Fel användarnamn eller lösenord.');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', background: '#111' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#1d1d1d', padding: '2rem', border: '1px solid #444', color: '#f4f4f4' }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>MD Login</h1>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.4rem' }}>
            <span>Användarnamn</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '0.8rem', background: '#000', border: '1px solid #666', color: '#fff' }} />
          </label>
          <label style={{ display: 'grid', gap: '0.4rem' }}>
            <span>Lösenord</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '0.8rem', background: '#000', border: '1px solid #666', color: '#fff' }} />
          </label>
          {error && <p style={{ color: '#ff8e8e', margin: 0 }}>{error}</p>}
          <button type="submit" style={{ padding: '0.9rem 1.2rem', border: 'none', background: '#b61d1d', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Logga in</button>
        </form>
      </div>
    </main>
  );
};

export const MdAdmin = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState(() => readLocalJson(NEWS_KEY, []));
  const [guestbook, setGuestbook] = useState(() => readLocalJson(GUESTBOOK_KEY, []));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (localStorage.getItem(ADMIN_KEY) !== 'true') {
      navigate('/md-login');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem(NEWS_KEY, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(guestbook));
  }, [guestbook]);

  const addNews = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    const nextEntry = {
      date,
      n: text.trim(),
    };

    setNews((current) => [nextEntry, ...normalizeNews(current)]);
    setText('');
    setStatus('Nyhet publicerad på startsidan.');
  };

  const removeGuestbook = (id) => {
    setGuestbook((current) => current.filter((item) => item.id !== id));
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY);
    navigate('/md-login');
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
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: '0.8rem', background: '#000', border: '1px solid #666', color: '#fff' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.4rem' }}>
              <span>Text</span>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} style={{ padding: '0.8rem', background: '#000', border: '1px solid #666', color: '#fff', resize: 'vertical' }} />
            </label>
            <button type="submit" style={{ padding: '0.9rem 1.2rem', background: '#b61d1d', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Publicera nyhet</button>
            {status && <p style={{ margin: 0, color: '#a5f3a5' }}>{status}</p>}
          </form>
        </section>

        <section style={{ background: '#1d1d1d', border: '1px solid #444', padding: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Gästbok</h2>
          {guestbook.length === 0 ? (
            <p>Inga inlägg ännu.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {guestbook.map((entry) => (
                <article key={entry.id} style={{ border: '1px solid #555', padding: '1rem', background: '#151515' }}>
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
};
