'use client';

import { useEffect, useState } from 'react';
import './AmbientFrame.css';

function elapsedSinceSven() {
  const start = new Date('2016-12-14T00:00:00');
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) { months -= 1; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years -= 1; months += 12; }
  const diff = Math.max(0, now.getTime() - start.getTime());
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  return { years, months, days, hours, minutes, seconds };
}

export default function AmbientFrame() {
  const [elapsed, setElapsed] = useState(elapsedSinceSven);
  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(elapsedSinceSven()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="side-banner" aria-hidden="true">
        <span>Mass Destruction</span><span>Mass Destruction</span>
      </div>
      <footer className="site-footer">
        <p>{elapsed.years} years {elapsed.months} months {elapsed.days} days <span>{elapsed.hours}h {elapsed.minutes}m {elapsed.seconds}s</span></p>
        <p>since we lost our dear brother / member <strong>Slam-Tilt</strong></p>
      </footer>
    </>
  );
}
