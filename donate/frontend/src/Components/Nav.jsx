import { NavLink } from "react-router-dom";
import logo from '../assets/logo.svg';

export default function Nav() {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="logo"/>
      <ul className="navbar-menu">
        <li>
          <NavLink 
            to="/apie"
            end
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Apie
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/istorijos" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Istorijos
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/vartotojai" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Vartotojas
          </NavLink>
        </li>
      </ul>
      <div className="navbar-right">
        <button>Prisijungti</button>
      </div>
    </div>
  );
}
