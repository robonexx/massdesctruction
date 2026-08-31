'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import './Logo.css';

export default function Logo({ onClick }) {
  return (
    <div className="logo">
      <Link href="/" onClick={onClick}>
        <motion.h1 initial={{ y: -300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>Mass</motion.h1>
        <motion.h1 initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: .6 }}>Destruction</motion.h1>
      </Link>
    </div>
  );
}
