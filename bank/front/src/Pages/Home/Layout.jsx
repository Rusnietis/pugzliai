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
            <div className="header">
                {/* <img src="/pinigai.jpg" alt="Pinigai"/> */}
                <div className="header_content">
                    <h2>Banko sistema</h2>
                    <p>Ši banko sistema sukurta naudojant React, Express ir MongoDB. Ji leidžia vartotojams kurti sąskaitas, peržiūrėti balansą ir atlikti operacijas.</p>

                </div>
               
            </div>

        </>
    );
}
