import Nav from '../../Components/Nav';
import { useContext } from 'react';
import { Home } from '../../Contexts/Home';



export default function Layout() {

    const { home } = useContext(Home)

    //console.log(home);

    if (!home) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <div className="header"
                style={{
                    backgroundImage: 'url(/pinigai1.jpeg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    position: 'relative'
                }}>
                <div className='stats' style={{ position: 'absolute', left: 10, top: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '8px', fontSize: '18px', margin: 0 }}>
                    <h3>Banko statistika</h3>
                    <hr />

                    {
                        home && home.map(item =>
                            <div key={item.name}>
                                <>

                                    {
                                        item.name === 'customers' ? < p style={{ margin: 0 }}>Bankas šiuo metu turi: <b>{item.count}</b> klientus</p> : null
                                    }
                                    {
                                        item.name === 'accounts' ? <p style={{ margin: 0 }}>Bendra laikoma suma: <b>{item.count}</b> eur</p> : null
                                    }
                                    {
                                        item.name === 'accounts' ? <p>Vidutinė laikoma suma: <b>{item.is_blocked}</b> eur</p> : null
                                    }
                                </>
                            </div>
                        )
                    }
                    <hr />

                </div>
                <div className="header_contents ">
                    <h2>Banko aplikacija v.4</h2>
                    <p>Ši banko aplikacija sukurta naudojant React, Express ir MariaDB. Ji leidžia vartotojams kurti sąskaitas, pridėti nuotraukas, peržiūrėti balansą ir atlikti kitas operacijas.</p>
                </div>
            </div>

        </>
    );
}
