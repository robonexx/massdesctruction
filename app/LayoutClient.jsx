'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hamburger from './components/Hamburger';
import MobileNav from './components/MobileNav';
import AmbientFrame from './components/AmbientFrame';

export default function LayoutClient({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/md-');

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Navigation />}
      {!isAdminRoute && <Hamburger active={mobileMenuOpen} setActive={setMobileMenuOpen} />}
      {!isAdminRoute && <MobileNav active={mobileMenuOpen} onNavigate={handleNavClick} />}
      {!isAdminRoute && <AmbientFrame />}
      {children}
    </>
  );
}
