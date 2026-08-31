import { useState } from 'react';
import {Routes, Route,  useLocation } from 'react-router-dom'
import Members from './pages/members/Members';
import NavMobile from './components/nav/NavMobile';
import Hamburger from './components/hamburger/Hamburger';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import BannerSideScroll from './components/bannersidescroll/BannerSideScroll';
import Welcome from './pages/welcome/Welcome';
import MemberDetails from './pages/members/MemberDetails';

// styles
import './App.scss'
import MediaFiles from './pages/mediafiles/MediaFiles';
import { ArticleDetails, Articles, Guestbook, LinksPage, Newsletter } from './pages/archive/ArchivePage';




function App() {
  const { pathname } = useLocation();
  const [menuPath, setMenuPath] = useState(null);
  const active = menuPath === pathname;
  const setActive = (nextActive) => setMenuPath(nextActive ? pathname : null);

  return (
    <div className="App">
      <Header />
      <Hamburger active={active} setActive={setActive}/>
      <Nav />
      <NavMobile active={active} onNavigate={() => setActive(false)} />
      <BannerSideScroll />
      <div className='bg_white'></div>      
      
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/members" element={<Members />} />
      <Route path="/members/:id" element={<MemberDetails />} />
      <Route path="/media" element={<MediaFiles />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:slug" element={<ArticleDetails />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route path="/guestbook" element={<Guestbook />} />
      <Route path="/links" element={<LinksPage />} />
      </Routes> 
      <Footer />
    </div>
  )
}

export default App
