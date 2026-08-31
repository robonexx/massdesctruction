import './ArchivePage.css';
import mediaBackground from '../../src/assets/images/bg_media.png';
import membersBackground from '../../src/assets/images/bg_members.png';
import membersDetailBackground from '../../src/assets/images/bg_members2.png';
import guestbookBackground from '../../src/assets/images/bg_guestbook.png';
import linksBackground from '../../src/assets/images/bg_links.png';
import mobileBackground from '../../src/assets/images/bg_mobile.png';

const backgrounds = {
  media: mediaBackground,
  members: membersBackground,
  member: membersDetailBackground,
  guestbook: guestbookBackground,
  links: linksBackground,
};

export default function ArchivePage({ 
  title, 
  eyebrow = 'Mass Destruction Archive', 
  background = 'media',
  children 
}) {
  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileBackground.src} />
        <img src={(backgrounds[background] || mediaBackground).src} alt="" className="bg_main" />
      </picture>
      <main className="archive-page">
        <p className="archive-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </main>
    </>
  );
}
