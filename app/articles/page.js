'use client';

import Link from 'next/link';
import ArchivePage from '../components/ArchivePage';
import { interviews } from '../lib/archive';
import './articles.css';

export default function ArticlesPage() {
  return (
    <ArchivePage 
      title="INTERVIEWS"
      eyebrow="Mass Destruction Archive"
      background="/archive/bg_media.png"
    >
      <p className="archive-lead">Röster ur funk- och streetdance-scenen, bevarade från originalwebbplatsen.</p>
      <div className="archive-grid">
        {interviews.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.slug} className="archive-card">
            <span>{article.date}</span>
            <h2>{article.name}</h2>
            <p>{article.intro}</p>
            <strong>Läs intervjun →</strong>
          </Link>
        ))}
      </div>
    </ArchivePage>
  );
}
