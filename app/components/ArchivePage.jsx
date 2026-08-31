import './ArchivePage.css';

const mediaBackground = '/assets/images/bg_media.png';
const mobileBackground = '/assets/images/bg_mobile.png';

const backgrounds = {
  media: mediaBackground,
  members: '/assets/images/bg_members.png',
  member: '/assets/images/bg_members2.png',
  guestbook: '/assets/images/bg_guestbook.png',
  links: '/assets/images/bg_links.png',
};

export default function ArchivePage({ 
  title, 
  eyebrow = 'Mass Destruction Archive', 
  background = 'media',
  compactTitle = false,
  children 
}) {
  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileBackground} />
        <img src={backgrounds[background] || mediaBackground} alt="" className="bg_main" />
      </picture>
      <header className={`archive-heading${compactTitle ? ' archive-heading--compact' : ''}`}>
        <p className="archive-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </header>
      <main className="archive-page">
        {children}
      </main>
    </>
  );
}
