import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArchivePage from '../../components/ArchivePage';
import { getMember, members } from '../../lib/members';
import '../members.css';

export function generateStaticParams() {
  return members.map((member) => ({ id: String(member.id) }));
}

export default async function MemberPage({ params }) {
  const { id } = await params;
  const member = getMember(id);
  if (!member) notFound();

  return (
    <ArchivePage title={member.name} eyebrow="Mass Destruction member" background="member">
      <article className="member-detail">
        <img src={member.image} alt={member.name} />
        <p>{member.desc}</p>
      </article>
      <Link href="/members" className="back-link">← Alla medlemmar</Link>
    </ArchivePage>
  );
}
