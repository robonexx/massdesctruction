import { useEffect, useState } from 'react'
import { parseISO, intervalToDuration } from 'date-fns'

// styles
import './datecalculator.scss'

function getInterval () {
  const leftEarth = parseISO('2016-12-14T00:00:00')
  const interval = intervalToDuration({
    start: new Date(),
    end: leftEarth
  })

  return interval
}


const DateCalculator = () => {
  const [checkDate, setCheckDate] = useState(getInterval())

  useEffect(() => {
    const timer = window.setInterval(() => setCheckDate(getInterval()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className='date'>
      <h4 className="days">{checkDate.years} years  {' '}
      {checkDate.months} months  {' '}
        {checkDate.days} days {' '}
        <span className="time">
        {checkDate.hours} hours {checkDate.minutes} minutes {checkDate.seconds} seconds
        </span>
      </h4>
    </div>
  )
}

export default DateCalculator














/* 
var now = new Date().getTime();
var timeleft = countDownDate - now;
    
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000); 
*/
