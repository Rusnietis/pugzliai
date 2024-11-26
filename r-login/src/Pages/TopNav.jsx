import { useContext } from "react";
import { Auth } from "../Contexts/Auth";

export default function TopNav() {

    const { user, logout } = useContext(Auth);





    return (
        <nav>
            <div className="menu">
                <a href="#home">Home</a>
                <a href="#fruits">Fruits</a>
            </div>
            <div className="login">
                {
                    user && <span className="user">{user.user}</span>
                }
                {
                    user && <span> | </span>
                }
                {
                    user && <a onClick={logout}>Logout</a>
                }
                {
                    !user && <a href="#register">Register</a>
                }
                {
                    user && <span> | </span>
                }
                {
                    !user && <a href="#login">Login</a>
                }

            </div>
        </nav>
    );
}