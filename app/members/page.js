'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ArchivePage from '../components/ArchivePage';
import './members.css';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/xxrobone/db/members');
        if (!response.ok) throw new Error('Failed to load members');
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  return (
    <ArchivePage 
      title="MEMBERS"
      background="/archive/bg_members.png"
    >
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading">Loading members...</div>}
      {members.length > 0 && (
        <div className="member_list">
          {members.map((member) => (
            <div key={member.id}>
              <Link href={`/members/${member.id}`}>
                <h2><span></span>{member.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
      <span className="passed">(R.i.P 13 februari 1980. ✝ 14 december 2016)</span>
    </ArchivePage>
  );
}
