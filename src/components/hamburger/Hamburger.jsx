// styles
import './hamburger.scss'

const Hamburger = ({ active, setActive }) => {
    
    const handleMenu = () => {
        setActive(!active)
    }
  return (
      <div className='hamburger' onClick={() => handleMenu()}>
          <h2>{active ? 'Close' : 'Open'}</h2>
    </div>
  )
}

export default Hamburger
