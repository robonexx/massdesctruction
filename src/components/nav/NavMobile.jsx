import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

// styles 
import './navmobile.scss'
import Logo from '../logo/Logo';

const navItems = [
    {
        title: 'Members',
        path: '/members'
    },
    {
        title: 'Media files',
        path: '/media'
    },
    {
        title: 'Articles',
        path: '/articles'
    },
    {
        title: 'Newsletter',
        path: '/newsletter'
    },
    {
        title: 'Guestbook',
        path: '/guestbook'
    },
    {
        title: 'Links',
        path: '/links'
    },
];

const NavMobile = ({active}) => {
  return (
      <nav className={`nav_mobile ${active ? 'open' :  ''}`}>
          <Logo />
           <ul className='menu'>
        {
          navItems.map(({ title, path }, i) => (
            <motion.li className='nav_item'
              key={title}
              initial={{ opacity: 0, y: i % 2 === 0 ? -200 : -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: i * 0.3 }}
            >
              <Link className='nav_link' to={path}>{title}</Link>
            </motion.li>            
          ))
        }              
          </ul>
    </nav>
  )
}

export default NavMobile
