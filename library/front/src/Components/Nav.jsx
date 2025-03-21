export default function Nav() {

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
                            <a className="nav-link" href="heroes">Heroes</a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        Login / Logout
                    </span>
                </div>
            </div>
        </nav>
    )
}