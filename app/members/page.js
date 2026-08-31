import Link from 'next/link';
import ArchivePage from '../components/ArchivePage';
import { members } from '../lib/members';
import './members.css';

export default function MembersPage() {
  return (
    <ArchivePage title="MEMBERS" background="members">
      <div className="member_list">
        {members.map((member) => (
          <Link href={`/members/${member.id}`} key={member.id}>
            <h2><span />{member.name}</h2>
          </Link>
        ))}
      </div>
      <span className="passed">Sven Forshell (13 februari 1980 – 14 december 2016)</span>
    </ArchivePage>
  );
}
