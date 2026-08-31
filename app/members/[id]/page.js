import Link from 'next/link';
import { notFound } from 'next/navigation';
import detailBackground from '../../../src/assets/images/bg_members2.png';
import mobileBackground from '../../../src/assets/images/bg_mobile.png';
import { getMember, members } from '../../lib/members';
import '../members.css';

export function generateStaticParams() { return members.map((member) => ({ id: String(member.id) })); }

export default async function MemberPage({ params }) {
  const member = getMember((await params).id);
  if (!member) notFound();
  return <><picture><source media="(max-width: 767px)" srcSet={mobileBackground.src} /><img src={detailBackground.src} alt="" className="bg_main" /></picture><main className="member-details"><article><h2>{member.name}</h2><p>{member.desc}</p><img src={member.image} alt={member.name} /><Link href="/members" className="member-back">← Members</Link></article></main></>;
}
