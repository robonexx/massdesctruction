import Link from 'next/link';
import membersBackground from '../../src/assets/images/bg_members.png';
import mobileBackground from '../../src/assets/images/bg_mobile.png';
import { members } from '../lib/members';
import './members.css';

export default function MembersPage() {
  return <><picture><source media="(max-width: 767px)" srcSet={mobileBackground.src} /><img src={membersBackground.src} alt="" className="bg_main" /></picture><main className="members-page"><section className="members-content"><h1>MEMBERS</h1><div className="member_list">{members.map((member) => <Link href={`/members/${member.id}`} key={member.id}><h2>{member.name}</h2></Link>)}</div><span className="passed">(R.i.P 13 februari 1980. ✝ 14 december 2016)</span></section></main></>;
}
