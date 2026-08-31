'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import './MobileNav.css';
import Logo from './Logo';

const navItems = [
  { title: 'Members', path: '/members' },
  { title: 'Media Files', path: '/media' },
  { title: 'Articles', path: '/articles' },
  { title: 'Newsletter', path: '/newsletter' },
  { title: 'Guestbook', path: '/guestbook' },
  { title: 'Links', path: '/links' },
];

export default function MobileNav({ active, onNavigate }) {
  return (
    <nav
      className={`nav_mobile ${active ? 'open' : ''}`}
      aria-label="Mobile navigation"
      aria-hidden={!active}
    >
      <Logo onClick={onNavigate} />
      <ul className="menu">
        {navItems.map(({ title, path }, i) => (
          <motion.li
            key={title}
            className="nav_item"
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: i * 0.3 }}
          >
            <Link href={path} className="nav_link" onClick={onNavigate}>
              {title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
