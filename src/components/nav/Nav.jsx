import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import './Nav.scss'

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
]

const Nav = () => {
  return (
      <nav className='nav'>
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

export default Nav

/* 
<motion.li className='nav_item'><a className='nav_link' href="">Media Files</a></motion.li>
              <motion.li className='nav_item'><a className='nav_link' href="">Articles</a></motion.li>
              <motion.li className='nav_item'><a className='nav_link' href="">Newsletter</a></motion.li>
              <motion.li className='nav_item'><a className='nav_link' href="">Guestbook</a></motion.li>
              <motion.li className='nav_item'><a className='nav_link' href="">Contact</a></motion.li>
              <motion.li className='nav_item'><a className='nav_link' href="">Links</a></motion.li>
*/
