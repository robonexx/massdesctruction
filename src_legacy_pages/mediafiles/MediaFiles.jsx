import { useIsDesktop } from '../../hooks/useMediaQuery'
import BGMED from '../../assets/images/bg_media.png'
import BGMobile from '../../assets/images/bg_mobile.png'
import { displayName, musicTracks, pictureFiles, videoClips } from '../../data/archive'
import { useState } from 'react'

//style 
import './mediafiles.scss'

const MediaFiles = () => {
    const desktop = useIsDesktop()
    const [section, setSection] = useState('music')
    
  return (
    <>
       <img src={desktop ? BGMED : BGMobile} alt="" className='bg_main' />
    <main className="media-archive">
      <p className="media-eyebrow">Original archive · 2004–2007</p><h1>MEDIA FILES</h1>
      <div className="media-tabs" role="tablist" aria-label="Media categories">{['music', 'video', 'pictures'].map((tab) => <button type="button" role="tab" aria-selected={section === tab} onClick={() => setSection(tab)} key={tab}>{tab}</button>)}</div>
      {section === 'music' && <div className="track-list">{musicTracks.map((track) => <article key={track}><div><strong>{displayName(track)}</strong><small>Prime</small></div><audio controls preload="none" src={`/archive/music/${track}`} /></article>)}</div>}
      {section === 'video' && <div className="video-grid">{videoClips.map(([file, title, description]) => <article key={file}><video controls preload="metadata" src={`/archive/video/${file}`} aria-label={title} /><div className="video-info"><h2>{title}</h2><p>{description}</p><a href={`/archive/video/${file}`} download>Download MP4</a></div></article>)}</div>}
      {section === 'pictures' && <div className="picture-grid">{pictureFiles.map((picture, index) => <a href={`/archive/pictures/${picture}`} target="_blank" rel="noreferrer" key={picture}><img loading="lazy" src={`/archive/pictures/${picture}`} alt={`Archive photo ${index + 1}`} /></a>)}</div>}
    </main>
    </>
  )
}

export default MediaFiles
