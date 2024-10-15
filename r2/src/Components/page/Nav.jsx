
export default function Nav() {

    return (
        <nav className="navbar">
                <a className="navbar-brand" href="#home">Home Base</a>

                <div className="navbar-nav">
                    <a className="nav-link active" href="#animals">Animals</a>
                    <a className="nav-link" href="#about">About zoo</a>
                    <a className="nav-link" href="#contact">Contacts</a>
                    
                </div>
            
        </nav>
    )
}