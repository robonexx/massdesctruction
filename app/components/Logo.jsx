'use client';

import Link from 'next/link';
import './Logo.css';

export default function Logo({ onClick }) {
  return (
    <Link href="/" className="logo" onClick={onClick}>
      <span>Mass</span>
      <span>Destruction</span>
    </Link>
  );
}
