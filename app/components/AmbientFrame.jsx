'use client';

import { useEffect, useState } from 'react';
import { intervalToDuration, parseISO } from 'date-fns';
import './AmbientFrame.css';

function elapsedSinceSven() {
  return intervalToDuration({ start: parseISO('2016-12-14T00:00:00'), end: new Date() });
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
      <footer>
        <div className="date">
          <h4 className="days">{elapsed.years} years {elapsed.months} months {elapsed.days} days <span className="time">{elapsed.hours} hours {elapsed.minutes} minutes {elapsed.seconds} seconds</span></h4>
        </div>
        <h4 className="slam_tilt">since we lost our dear brother / member <span>Slam-Tilt</span></h4>
      </footer>
    </>
  );
}
