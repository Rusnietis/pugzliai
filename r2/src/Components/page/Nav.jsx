import Link from "./Link"
export default function Nav() {

    return (
        <nav className="navbar">
                <a className="navbar-brand" href="#home">Home Base</a>

                <div className="navbar-nav">
                    <Link href="#animals">Animals</Link>
                    <Link href="#about">About zoo</Link>
                    <Link href="#contact">Contacts</Link>
                    
                </div>
            
        </nav>
    )
}