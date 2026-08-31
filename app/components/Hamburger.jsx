'use client';

import './Hamburger.css';

export default function Hamburger({ active, setActive }) {
  const handleMenu = () => {
    setActive(!active);
  };

  return (
    <div className="hamburger" onClick={handleMenu} role="button" aria-label="Toggle menu" aria-pressed={active}>
      <h2>{active ? 'Close' : 'Open'}</h2>
    </div>
  );
}
