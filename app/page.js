'use client';

import { useEffect, useState } from 'react';
import desktopBackground from '../src/assets/images/bg_main.png';
import mobileBackground from '../src/assets/images/bg_mobile.png';

const defaultNewsItems = [
  {
    date: '2007-11-16',
    n: 'Got a new clip, this one of Razzle Dazzle playing with Primes latest track. Check it all out in the media section.',
  },
  {
    date: '2007-02-20',
    n: 'G-Style member Baby Bang och Ooooh Tiffany brought us a clip from France with Primes music. Check it all out in the media section.',
  },
  {
    date: '2007-01-03',
    n: 'Site is finally back up, AGAIN! Now our guestbook is working.',
  },
  {
    date: '2005-02-18',
    n: 'Mass Destruction featured in new commercial on Swedish Television',
  },
];

export default function HomePage() {
  const [newsItems, setNewsItems] = useState(defaultNewsItems);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) setNewsItems(data);
      } catch (error) {
        console.warn('News load failed, using fallback data', error);
      }
    };

    load();
  }, []);

  return (
    <main className="page-shell">
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileBackground.src} />
        <img className="home-background" src={desktopBackground.src} alt="" />
      </picture>
      <section className="hero-block">
        <div className="hero-copy">
          <p className="eyebrow">Welcome</p>
          <h1>Mass Destruction</h1>
          <p>
            Join force with three generations of funkateers. Patrik ‘Prime’ Helge and Tomas ‘Quill’
            Strandgren represent the first generation, while Robert ‘RobOne’ Wägar continues the
            movement and keeps the spirit alive.
          </p>
        </div>

        <aside className="news-panel">
          <p className="eyebrow red">News</p>
          <div className="news-list">
            {newsItems.map((item, index) => (
              <article key={`${item.date}-${index}`} className="news-item">
                <time>{item.date}</time>
                <p>{item.n}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
