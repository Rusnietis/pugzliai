import Nav from '../../Components/Nav';
import { useContext } from 'react';
import { Home } from '../../Contexts/Home';



export default function Layout() {

    const { home } = useContext(Home)

    if (!home) return (<div>Loading...</div>)

        return (
            <>
                <Nav />
                <div className="container text-center">
                    <div className="row">
                        <div className="col-4 mt-4">
                            <h1>Home</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-8 mt-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Stats</h3>
                                </div>
                                <div className="card-body">
                                    {
                                        home.map(item =>
                                            <div className="row" key={item.name}>
                                                <div className="col-12">
                                                    <h5>{item.name}</h5>
                                                    {
                                                        item.name === 'authors' &&
                                                        <p>Total {item.count} authors</p>
                                                    }
                                                    {
                                                        item.name === 'books' &&
                                                        <>
                                                        <p>We have {item.count} books</p>
                                                        <p>The biggest book has {item.stats} pages </p>
                                                        </>
                                                    }
                                                    {
                                                        item.name === 'heroes' &&
                                                        <>
                                                        <p>We count {item.count} heroes</p>
                                                        <p>They have {item.stats} good heroes</p>
                                                        <p>They have {item.count - item.stats} bad heroes</p>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }