import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import logo from '../assets/logo.svg';
import { Auth } from '../Contexts/Auth.jsx'
import useLogin from "../Hooks/useLogin.jsx";

export default function Nav() {

  const { user } = useContext(Auth);
  const { logout } = useLogin();

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <li>
          <NavLink to="/apie" end className={({ isActive }) => (isActive ? "active" : "")}>
            Apie
          </NavLink>
        </li>
        <li>
          <NavLink to="/istorijos" className={({ isActive }) => (isActive ? "active" : "")}>
            Istorijos
          </NavLink>
        </li>
        <li>
          <NavLink to="/mano-istorijos" className={({ isActive }) => (isActive ? "active" : "")}>
            Mano istorijos
          </NavLink>
        </li>
        <li>
          <NavLink to="/register/list" className={({ isActive }) => (isActive ? "active" : "")}>
            Vartotojai
          </NavLink>
        </li>

      </ul>

      <div className="navbar-right">
        {user && <span className="user">{user.user}</span>}
        {user && <span className="sep"> | </span>}
        {user ? (
          <i
            className="button-18 "
            style={{ cursor: "pointer", backgroundColor: 'red' }}
            onClick={logout}
          >
            Logout
          </i>
        ) : (
          <>
            <NavLink
              to="/login"
              className="button-18"
              style={{ cursor: "pointer" }}
            >
              Login
            </NavLink>
            <span> | </span>
            <NavLink
              to="/register"
              className="button-18"
              style={{ cursor: "pointer", backgroundColor: "green" }}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

