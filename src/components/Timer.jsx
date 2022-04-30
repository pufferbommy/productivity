import { useState, useEffect } from 'react'
import { BsFillSkipEndFill } from 'react-icons/bs'
import { getDataFromLocalStorage } from '../utils'

const Timer = () => {
  const [minutes, setMinutes] = useState(
    getDataFromLocalStorage('duration', 'workMinutes'),
  )
  const [seconds, setSeconds] = useState(0)
  const [isStart, setIsStart] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  let interval

  const handleStart = () => setIsStart(true)

  const handleStop = () => {
    setIsStart(false)
    clearInterval(interval)
  }

  const handleSkip = () => {
    if (isStart) {
      clearInterval(interval)
      if (isBreak) {
        setIsBreak(false)
        setIsStart(false)
        setMinutes(25)
        setSeconds(0)
      } else {
        setIsBreak(true)
        setIsStart(false)
        setMinutes(5)
        setSeconds(0)
      }
    }
  }

  useEffect(() => {
    if (isStart) {
      interval = setInterval(() => {
        clearInterval(interval)
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            if (isBreak) {
              setMinutes(25)
              setSeconds(0)
              setIsBreak(false)
            } else {
              setMinutes(0)
              setSeconds(10)
              setIsBreak(true)
            }
            setIsStart(false)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }
  }, [isStart, seconds])

  const timerMinutes = minutes < 10 ? '0' + minutes : minutes
  const timerSeconds = seconds < 10 ? '0' + seconds : seconds

  return (
    <div className="bg-neutral-50 px-4 flex justify-center items-center h-80">
      <div className="flex items-center flex-col gap-6">
        {isBreak && <div className="text-3xl">Break Time!</div>}
        <span className="text-8xl text-blue-500">
          {timerMinutes}:{timerSeconds}
        </span>
        {!isStart ? (
          <button
            onClick={handleStart}
            className="text-blue-500 font-bold py-2 rounded shadow border-blue-500 border hover:bg-blue-500 hover:text-white transition-colors w-40"
          >
            Start
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={handleStop}
              className="text-red-500 font-bold py-2 rounded shadow border-red-500 border hover:bg-red-500 hover:text-white transition-colors w-40"
            >
              Stop
            </button>
            <BsFillSkipEndFill
              onClick={handleSkip}
              cursor="pointer"
              className="absolute hover:scale-125 transition-transform top-1/2 -translate-y-1/2 -right-14"
              size="1.5rem"
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Timer
