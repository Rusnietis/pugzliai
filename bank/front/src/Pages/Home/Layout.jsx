import Nav from '../../Components/Nav';
import { useContext } from 'react';
import Homes from './Home';



export default function Layout() {

    //const { home } = useContext(Home)

    //if (!home) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <Homes />
            {/* <h1>Pagrindinis</h1>
            <div className="header">

                <div style={{
                    backgroundImage: `url(${pinigai})`,
                    height: '300px',
                    backgroundSize: 'cover',
                }}>
                    <h2>Banko sistema</h2>
                    <p>Ši banko sistema sukurta naudojant React, Express ir MongoDB. Ji leidžia vartotojams kurti sąskaitas, peržiūrėti balansą ir atlikti operacijas.</p>

                </div>

            </div> */}

        </>
    );
}
