import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArchivePage from '../../components/ArchivePage';
import { getInterview, interviews } from '../../lib/interviews';
import '../articles.css';

export function generateStaticParams() {
  return interviews.map((interview) => ({ slug: interview.slug }));
}

export async function generateMetadata({ params }) {
  const article = getInterview((await params).slug);
  return article
    ? { title: `${article.name} ${article.type === 'video' ? 'video interview' : 'interview'} | Mass Destruction` }
    : { title: 'Interview | Mass Destruction' };
}

export default async function ArticleDetailPage({ params }) {
  const article = getInterview((await params).slug);
  if (!article) notFound();

  return (
    <ArchivePage 
      title={article.name}
      eyebrow={`Interview · ${article.date}`}
      background="media"
      compactTitle
    >
      <p className="archive-lead">{article.intro}</p>
      {article.type === 'video' ? (
        <article className="article-body video-interview">
          <video controls preload="metadata" playsInline aria-label={`Interview with ${article.name}`}>
            <source src={`/archive/video/${article.videoFile}`} type="video/mp4" />
          </video>
          <a href={`/archive/video/${article.videoFile}`} download>Download MP4</a>
        </article>
      ) : (
        <article className="article-body interview-transcript">
          <p className="transcript-note">Transkriberad från den arkiverade originalwebbplatsen. Språk och tidsprägel har bevarats.</p>
          {article.questions.map((entry, index) => (
            <section className="interview-exchange" key={`${article.slug}-${index}`}>
              <p className="interview-label">Question {index + 1}</p>
              <h2>{entry.question}</h2>
              {entry.context && <p className="question-context">({entry.context})</p>}
              <p className="interview-label interview-label--answer">Answer</p>
              {entry.list && (
                <ul className="answer-list">
                  {entry.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {entry.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </article>
      )}
      <Link href="/articles" className="back-link">← Alla intervjuer</Link>
    </ArchivePage>
  );
}
