'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import ArchivePage from '../../components/ArchivePage';
import { interviews } from '../../lib/archive';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  
  const article = interviews.find((item) => item.slug === slug);
  
  if (!article) {
    return (
      <ArchivePage 
        title="Intervjun hittades inte"
        background="media"
      >
        <Link href="/articles" className="back-link">Till alla intervjuer</Link>
      </ArchivePage>
    );
  }

  return (
    <ArchivePage 
      title={article.name}
      eyebrow={`Interview · ${article.date}`}
      background="media"
    >
      <p className="archive-lead">{article.intro}</p>
      <section className="article-body">
        <h2>Ur originalarkivet</h2>
        <p>Den här intervjun är återfunnen i den arkiverade versionen av massdestruction.se. Originalets teman och sammanhang är bevarade här medan hela textmaterialet restaureras.</p>
        <ul>
          {article.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <p className="archive-note">Fullständig transkribering från originalets HTML är nästa restaureringssteg.</p>
      </section>
      <Link href="/articles" className="back-link">← Alla intervjuer</Link>
    </ArchivePage>
  );
}
