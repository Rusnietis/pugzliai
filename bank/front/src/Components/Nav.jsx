import { Logo } from '../Pages/Icons'
import Link from './Link'

//import { useContext } from 'react';
//import { Auth } from '../Contexts/Auth';
// import useLogin from '../Hooks/useLogin';

export default function Nav() {

    //const { user} = useContext(Auth);
    // const {logout} = useLogin();

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><Logo /></a>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <a className="nav-link active" aria-current="page" href="#home">Pagrindinis</a> */}
                            <Link className="nav-link active"  href="#home">Pagrindinis</Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#customers">Klientai</a> */}
                            <Link className="nav-link" href="#customers">Klientai</Link>
                        </li>

                    </ul>
                    <div className="d-flex">
                        <span>
                            <a className="register-button m-2" href="#register">Registruotis</a>
                            arba
                            <a className="login-button m-2" href="#login">Prisijungti</a>
                        </span>
                        {/* {
                            user && <span className="user">{user.user}</span>
                        }
                        {
                            user && <span className="sep"> | </span>
                        }
                        {
                            user && <i className="logout" onClick={logout}>Logout</i>
                        }
                        {
                            !user && <a className="nav-link" href="#register">Register</a>
                        }
                        {
                            !user && <span className="sep"> | </span>
                        }
                        {
                            !user && <a className="nav-link" href="#login">Login</a>
                        } */}

                    </div>
                </div>
            </div>
        </nav>

    )
}