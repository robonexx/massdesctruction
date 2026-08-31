'use client';

import Link from 'next/link';
import ArchivePage from '../components/ArchivePage';
import { archiveLinks } from '../lib/archive';
import './links.css';
import './links.css';

export default function LinksPage() {
  return (
    <ArchivePage 
      title="LINKS"
      eyebrow="Mass Destruction Archive"
      background="/archive/bg_links.png"
    >
      <p className="archive-lead">Originalets länksamling. Vissa äldre webbplatser kan ha flyttat eller försvunnit.</p>
      <div className="link-list">
        {archiveLinks.map(([name, url]) => (
          <a href={url} target="_blank" rel="noreferrer" key={name}>
            <span>{name}</span>
            <small>{url}</small>
          </a>
        ))}
      </div>
    </ArchivePage>
  );
}
