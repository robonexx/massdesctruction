'use client';

import Link from 'next/link';
import './Header.css';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <h4 className="header_text">
        This is a tribute to our beloved member Sven Forshell who also was the designer of the original website
      </h4>
    </header>
  );
}
