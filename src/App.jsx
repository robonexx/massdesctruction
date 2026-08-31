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
import { MdAdmin, MdLogin } from './pages/admin/AdminPanel';

// styles
import './App.scss'
import MediaFiles from './pages/mediafiles/MediaFiles';
import { ArticleDetails, Articles, Guestbook, LinksPage, Newsletter } from './pages/archive/ArchivePage';




function App() {
  const { pathname } = useLocation();
  const [menuPath, setMenuPath] = useState(null);
  const active = menuPath === pathname;
  const setActive = (nextActive) => setMenuPath(nextActive ? pathname : null);
  const isAdminRoute = pathname.startsWith('/md-');

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Hamburger active={active} setActive={setActive}/>}
      {!isAdminRoute && <Nav />}
      {!isAdminRoute && <NavMobile active={active} onNavigate={() => setActive(false)} />}
      {!isAdminRoute && <BannerSideScroll />}
      {!isAdminRoute && <div className='bg_white'></div>}
      
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
      <Route path="/md-login" element={<MdLogin />} />
      <Route path="/md-admin" element={<MdAdmin />} />
      </Routes> 
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
