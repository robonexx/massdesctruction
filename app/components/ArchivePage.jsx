'use client';

import './ArchivePage.css';

export default function ArchivePage({ 
  title, 
  eyebrow = 'Mass Destruction Archive', 
  background = '/archive/bg_media.png',
  children 
}) {
  return (
    <>
      <img 
        src={background} 
        alt="" 
        className="bg_main" 
      />
      <main className="archive-page">
        <p className="archive-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </main>
    </>
  );
}
