import { NavLink } from 'react-router-dom'

const Header = () => {
  const className = ({ isActive }) => {
    return isActive ? 'font-bold' : 'text-gray-300'
  }

  return (
    <header className="bg-gray-800 flex justify-between text-white p-4">
      <h1 className="text-2xl">Productivity🖼️</h1>
      <div className="flex items-center gap-4">
        <NavLink className={className} active to="/">
          Timer
        </NavLink>
        <NavLink className={className} to="/how-to">
          How To
        </NavLink>
        <NavLink className={className} to="/settings">
          Settings
        </NavLink>
      </div>
    </header>
  )
}
export default Header
