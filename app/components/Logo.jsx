'use client';

import Link from 'next/link';
import './Logo.css';

export default function Logo({ onClick }) {
  return (
    <Link href="/" className="logo" onClick={onClick}>
      <h1>MD</h1>
    </Link>
  );
}
