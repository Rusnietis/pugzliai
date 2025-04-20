import Nav from '../../Components/Nav';
import { useContext } from 'react';
import { Home } from '../../Contexts/Home';



export default function Layout() {

    const { home } = useContext(Home)

    //if (!home) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <h1>Pagrindinis</h1>

        </>
    );
}
