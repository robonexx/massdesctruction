import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import './Sidescroll.scss'


const banner = {
    animate: {
        transition: {
          duration: 5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };
  
  const letterAni = {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 0.6,
      },
    },
};
  
  
const AnimatedLetters = ({ title, disabled }) => (
    <motion.span
      className='row_title'
      variants={disabled ? null : banner}
      initial='initial'
      animate='animate'
    >
      {[...title].map((letter, i) => (
       
        <motion.span key={i}
          className='row_letter' 
          variants={disabled ? null : letterAni}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );

const SideScrollText = ({ title, sideScroll, setSideScroll }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          setSideScroll(true);
        }, 4000);
        return () => clearTimeout(timer)
      }, [setSideScroll]);
    return (
      <div className={`banner_row sideScroll  ${sideScroll && 'animate'}`}>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className='sideScroll_inner'
        >
          <AnimatedLetters title={title} disabled />
          <AnimatedLetters title={title} />
        </motion.div>
      </div>
    );
};
  


export default function BannerSideScroll() {
    const [sideScroll, setSideScroll] = useState(true);
    
  return (
      <motion.div className='banner' variants={banner}>
          <SideScrollText title={'Mass Destruction'} sideScroll={sideScroll} setSideScroll={setSideScroll} />
    </motion.div>
  )
}
