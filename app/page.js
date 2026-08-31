'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import desktopBackground from '../src/assets/images/bg_main.png';
import mobileBackground from '../src/assets/images/bg_mobile.png';
import './home.css';

const defaultNewsItems = [
  { date: '2007-11-16', n: 'Got a new clip, this one of Razzle Dazzle playing with Primes latest track. Check it all out in the media section.' },
  { date: '2007-02-20', n: 'G-Style member Baby Bang och Ooooh Tiffany brought us a clip from France with Primes music. Check it all out in the media section. (Ps. You can download the song too.)' },
  { date: '2007-01-03', n: 'Site is finally back up, AGAIN! Now our guestbook is working.' },
  { date: '2005-02-18', n: 'Mass Destruction featured in new commercial on Swedish Television.' },
  { date: '2004-12-24', n: 'Merry Christmas! There is a new clip and a whole new section.' },
  { date: '2004-11-11', n: 'Some rare oldschool footage and Quill mowing his lawn!' },
  { date: '2004-11-06', n: 'Slam Tilt wins the Swedish Masters in Gothenburg.' },
  { date: '2004-10-30', n: 'Slam Tilt wins 1on1 Boogie competition at the jam Fresh held in honour of our beloved DJ Leacy.' },
  { date: '2004-10-29', n: 'Slam Tilt enters Battle Night at Grodan, Stockholm with Abraham and Fidde from Style Warriors.' },
  { date: '2004-05-01', n: 'New backgrounds from the future.' },
  { date: '2004-05-11', n: 'Site released.' },
];

export default function HomePage() {
  const [newsItems, setNewsItems] = useState(defaultNewsItems);

  useEffect(() => {
    fetch('/api/news')
      .then((response) => response.ok ? response.json() : [])
      .then((data) => { if (Array.isArray(data) && data.length) setNewsItems(data); })
      .catch(() => {});
  }, []);

  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileBackground.src} />
        <img className="bg_main" src={desktopBackground.src} alt="" />
      </picture>
      <main className="content_wrapper welcome-page">
        <section className="welcome-left">
          <div className="welcome-copy">
            <motion.h2 initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: 1.4 }}>Welcome</motion.h2>
            <div className="text">
              <h4>Join force with Three generations of funkateers.!</h4>
              <p className="brodtext">
                Patrik ‘Prime’ Helge & Tomas ‘Quill’ Strandgren, representing Swedens first generation, started back in 1983 as Hip Hop spread across the world. With its philosophy about originality and creativity they developed their own styles, gradually learning more about the true roots.<br /><br />
                Second generation, starting with Hiphop/breaking -84-89 Robert “RobOne” Wägar later got struck by Funk and is the most prominent locker in Sweden today.<br /><br />
                Joining these three veterans in the battle for the afterworld is Sven Forshell, a promising hope for the funk styles scene after the holocaust.<br /><br />
                So, surviving several nuclear winters the dance still lives and breathes in the harsh climate of Scandinavia, and now it’s time to show what we got.
              </p>
            </div>
          </div>
        </section>
        <section className="welcome-right">
          <div className="welcome-news">
            <motion.h2 initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: 1.4 }}>News</motion.h2>
            {newsItems.map(({ date, n }, index) => <article className="news_item" key={`${date}-${index}`}><p className="news_date">{date}</p><p className="brodtext">{n}</p></article>)}
          </div>
        </section>
      </main>
    </>
  );
}
