import Nav from '../../Components/Nav';
import useGet from '../../Hooks/useGet';

export default function Index() {

    const { data, error, loading } = useGet('/')

    if (loading) return (< div className="loader"><div></div></div>)

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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
