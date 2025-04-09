import { useContext } from 'react';
import { Auth } from '../Contexts/Auth';
import useLogin from '../Hooks/useLogin';

export default function Nav() {

    const { user} = useContext(Auth);
    const {logout} = useLogin();

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">My library</a>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#authors">Authors</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#books">Books</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#heroes">Heroes</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {/* <a className="nav-link" href="#login">Login</a> */}
                       
                        {
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
                        }
                   
                    </div>
                </div>
            </div>
        </nav>
    )
}