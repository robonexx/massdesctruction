'use client';

import { useState } from 'react';
import { displayName, musicTracks, pictureFiles, videoClips } from '../lib/archive';
import './media.css';

export default function MediaPage() {
  const [section, setSection] = useState('music');
  return <><picture><source media="(max-width: 767px)" srcSet="/assets/images/bg_mobile.png" /><img src="/assets/images/bg_media.png" alt="" className="bg_main" /></picture><main className="media-page"><section className="media-content"><h1>MEDIA FILES</h1><p className="media-eyebrow">Original archive · 2004–2007</p><div className="media-tabs" role="tablist" aria-label="Media categories">{['music','video','pictures'].map((tab) => <button key={tab} type="button" role="tab" aria-selected={section === tab} onClick={() => setSection(tab)} className={section === tab ? 'active' : ''}>{tab}</button>)}</div>{section === 'music' && <div className="track-list">{musicTracks.map((track) => <article key={track}><div><strong>{displayName(track)}</strong><small>Prime</small></div><audio controls preload="none" src={`/archive/music/${track}`} /></article>)}</div>}{section === 'video' && <div className="video-grid">{videoClips.map(([file,title,description]) => <article key={file}><video controls preload="metadata" src={`/archive/video/${file}`} aria-label={title} /><div className="video-info"><h2>{title}</h2><p>{description}</p><a href={`/archive/video/${file}`} download>Download MP4</a></div></article>)}</div>}{section === 'pictures' && <div className="picture-grid">{pictureFiles.map((picture,index) => <a href={`/archive/pictures/${picture}`} target="_blank" rel="noreferrer" key={picture}><img loading="lazy" src={`/archive/pictures/${picture}`} alt={`Archive photo ${index + 1}`} /></a>)}</div>}</section></main></>;
}
