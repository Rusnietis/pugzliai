import { useContext, useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import useGet from '../../Hooks/useGet';
import { Router } from '../../Contexts/Router';


export default function Index() {

    const {params} = useContext(Router);

    const { data, loading, setUrl } = useGet('/hero/' + params[0] || '0');
    
    console.log(params)




    if (loading) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <div className="container text-center">
                <div className="row">
                    <div className="col-4 mt-4">
                        <h1>Hero</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="col-3">
                                    <h3>All Library</h3>
                                </div>
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
