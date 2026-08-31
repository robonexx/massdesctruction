import Link from 'next/link';
import ArchivePage from '../components/ArchivePage';
import { clipTrackList } from '../lib/archive';
import { interviews } from '../lib/interviews';
import './articles.css';

export default function ArticlesPage() {
  return (
    <ArchivePage 
      title="INTERVIEWS"
      eyebrow="Mass Destruction Archive"
      background="media"
    >
      <p className="archive-lead">Röster ur funk- och streetdance-scenen, bevarade från originalwebbplatsen.</p>
      <div className="archive-grid interview-grid">
        {interviews.map((article) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.slug}
            className={`archive-card${article.status === 'coming-soon' ? ' interview-card--upcoming' : ''}`}
          >
            <span>{article.date}</span>
            <h2>{article.name}</h2>
            <p>{article.intro}</p>
            <strong>{article.status === 'coming-soon' ? 'Förhandsvisning →' : 'Läs intervjun →'}</strong>
          </Link>
        ))}
      </div>

      <section className="clip-soundtrack" aria-labelledby="clip-soundtrack-title">
        <p className="clip-soundtrack__eyebrow">Original archive</p>
        <h2 id="clip-soundtrack-title">Clip track list</h2>
        <p>Musiken som användes i några av originalklippen på massdestruction.se.</p>
        <div className="clip-track-table">
          {clipTrackList.map((item) => (
            <article key={item.clip} className="clip-track-row">
              <div>
                <strong>{item.clip}</strong>
                <span>{item.title}</span>
              </div>
              <ul>
                {item.tracks.map((track) => <li key={track}>{track}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </ArchivePage>
  );
}
