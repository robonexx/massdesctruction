import ArchivePage from '../components/ArchivePage';

export default function NewsletterPage() {
  return (
    <ArchivePage title="STREET SCENE" eyebrow="Newsletter · Sverige" background="guestbook">
      <p className="archive-lead">En redaktionell yta för jams, battles, workshops och människorna i Sveriges streetdance-scen.</p>
      <div className="archive-grid">
        <article className="archive-card"><span>Kommande</span><h2>Events & battles</h2><p>Datum, plats, kategorier och länkar till anmälan.</p></article>
        <article className="archive-card"><span>Stories</span><h2>Scenen berättar</h2><p>Intervjuer, crews, historia och nya generationer.</p></article>
        <article className="archive-card"><span>Community</span><h2>Tipsa oss</h2><p>Den här delen öppnas när redaktörsflödet är redo.</p></article>
      </div>
    </ArchivePage>
  );
}
