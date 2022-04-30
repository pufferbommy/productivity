import { useEffect, useState } from 'react'
import { getDataFromLocalStorage } from '../utils'
import { Link } from 'react-router-dom'

const Settings = () => {
  const [duration, setDuration] = useState({
    workMinutes: getDataFromLocalStorage('duration', 'workMinutes') || 25,
    breakMinutes: getDataFromLocalStorage('duration', 'breakMinutes'),
  })

  const handleChange = (e) => {
    setDuration((prev) => {
      return { ...prev, [e.target.name]: Number(e.target.value) }
    })
  }

  useEffect(() => {
    localStorage.setItem('duration', JSON.stringify(duration))
  }, [duration])

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="flex flex-col gap-2">
        <span>Work duration</span>
        <span>Current: {duration.workMinutes}</span>
        <input
          name="workMinutes"
          onChange={handleChange}
          className="w-60"
          type="range"
          min={5}
          max={60}
          value={duration.workMinutes}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>Break duration</span>
        <span>Current: {duration.breakMinutes}</span>
        <input
          name="breakMinutes"
          onChange={handleChange}
          className="w-60"
          type="range"
          min={5}
          max={30}
          value={duration.breakMinutes}
        />
      </div>
      <Link
        className="text-blue-500 font-bold py-2 rounded shadow border-blue-500 text-center border hover:bg-blue-500 hover:text-white transition-colors w-36"
        to="/"
      >
        Back to home
      </Link>
    </div>
  )
}
export default Settings
