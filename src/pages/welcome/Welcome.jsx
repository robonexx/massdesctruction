import { motion } from 'framer-motion'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import BG from '../../assets/images/bg_main.png'
import BGMobile from '../../assets/images/bg_mobile.png'
// styles
import './Welcome.scss'

const newsItems = [
  {
    date: '2007-11-16',
    n: 'Got a new clip, this one of Razzle Dazzle playing with Primes latest track. Check it all out in the media section.',
  },
  {
    date: '2007-02-20',
    n: 'G-Style member Baby Bang och Ooooh Tiffany brought us a clip from France with Primes music. Check it all out in the media section. (Ps. You can download the song too. ',
  },
  {
    date: '2007-01-03',
    n: 'Site is finally back up, AGAIN! Now our guestbook is working.',
  },
  {
    date: '2005-02-18',
    n: 'Mass Destruction featured in new commercial on Swedish Television',
  },
  {
    date: '2004-12-24',
    n: 'Merry Chistmas! There`s a new clip and a whole new section with',
  },
  {
    date: '2004-11-11',
    n: 'some rare oldschool footage and Quill mowing his lawn!',
  },
  {
    date: '2004-11-06',
    n: 'Slam Tilt wins the Swedish Masters in Gothenburg.',
  },
  {
    date: '2004-10-30',
    n: 'Slam Tilt wins 1on1 Boogie competition at the jam Fresh held in honour of our beloved DJ Leacy.',
  },
  {
    date: '2004-10-29',
    n: 'Slam Tilt enters the competition Battle Night and Grodan Sergel Stockholm with Abraham and Fidde from Style Warrios.',
  },
  {
    date: '2004-05-1',
    n: 'New back-grounds from the future',
  },
  {
    date: '2004-05-11',
    n: 'Site Released',
  },
]
const Welcome = () => {
  const desktop = useIsDesktop()
  return (
    <>
    <img src={desktop ? BG : BGMobile} alt="" className='bg_main' />
    <div className="content_wrapper welcome">
    <div className="left_side ">
      <div className="welcome">
        <motion.h2
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        >Welcome</motion.h2>
      <div className="text">
        <h4>Join force with Three generations of funkateers.!</h4>
              <p className='brodtext'>
                 Patrik ‘Prime’ Helge & Tomas ‘Quill’ Strandgren, representing Swedens first generation, started back in 1983 as Hip Hop spread across the world. With its philosophy about originality and creativity they developed their own styles, gradually learning more about the true roots.<br/><br/>

Second generation, starting with Hiphop/breaking -84-89 Robert "RobOne" Wägar later got struck by Funk and is the most prominent locker in Sweden today.
<br/><br/>
Joining these three veterans in the battle for the afterworld is Sven Forshell, a promising hope for the funk styles scene after the holocaust.
<br/><br/>
So, surviving several nuclear winters the dance still lives and breathes in the harsch climate of Scandinavia, and now it’s time to show what we got.
          </p>
      </div>
      
      </div>
    </div>
    <div className="right_side">
    <div className='news'>
        <motion.h2
         initial={{ opacity: 0, x: 100 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.6, delay: 1.4 }}
            >NEWS</motion.h2>
             {newsItems.map(({date, n}) => (
              <div className="news_item" key={date}>
              <p className='news_date'>{date}</p>
              <p className='brodtext'>
                {n}
              </p>
          </div>
            ))}       
      </div>
    </div>
  </div>
    </>
  )
}

export default Welcome
