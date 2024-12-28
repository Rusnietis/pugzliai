import { useContext } from "react";
import { Auth } from "../Contexts/Auth";
import Gate from "./Auth/Gate";

export default function TopNav() {

    const { user, logout } = useContext(Auth);





    return (
        <nav>
            <div className="menu">
                <a href="#home">Pagrindinis</a>
                
                <Gate roles="admin|editor|viewer"><a href="#customers">Banko klientu sarasas</a></Gate>
                <Gate roles="admin|editor"><a href="#customers/create">Prideti klienta</a></Gate>
                <a href="#users">Users</a>
            </div>
            <div className="login">
                {
                    user && <span className="user">{user.user}</span>
                }
                {
                    user && <span> | </span>
                }
                {
                    user && <i onClick={logout}>Logout</i>
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

            {/* <div className="menu">
                <a href="#home">Home</a>
                {
                    user && <a href="#fruits">Fruits</a>
                }
                <a href="#fruits/create">Add fruit</a>
            </div>
            <div className="login">
                {
                    user && <span className="user">{user.user}</span>
                }
                {
                    user && <span> | </span>
                }
                {
                    user && <i onClick={logout}>Logout</i>
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

            </div> */}
        </nav>
    );
}