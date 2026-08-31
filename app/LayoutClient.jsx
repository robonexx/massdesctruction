'use client';

import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hamburger from './components/Hamburger';
import MobileNav from './components/MobileNav';

export default function LayoutClient({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Header />
      <Navigation />
      <Hamburger active={mobileMenuOpen} setActive={setMobileMenuOpen} />
      <MobileNav active={mobileMenuOpen} onNavigate={handleNavClick} />
      {children}
    </>
  );
}
