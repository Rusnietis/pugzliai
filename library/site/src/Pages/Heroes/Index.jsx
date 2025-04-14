import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import useGet from '../../Hooks/useGet';

import * as icon from '../../Icons'
import { SERVER_URL } from '../../Constants/main';


export default function Index() {

    const { data, loading, setUrl } = useGet('/heroes-list');


    const go = (e, page) => {
        e.preventDefault();
        setUrl('/heroes-list?page=' + page)
    }



    if (loading) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <div className="container text-center">
                <div className="row">
                    <div className="col-4 mt-4">
                        <h1>Heroes</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="col-3">
                                    <h3>List</h3>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table heroes-table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Good/Bad</th>
                                            <th>Book</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.result.map(hero => {
                                            return (
                                                <tr key={hero.id}>
                                                    <td>{hero.id}</td>
                                                    <td>{hero.name}</td>
                                                    <td><span className={'icon ' + (hero.good ? 'good' : 'bad')}>{hero.good ? icon.good : icon.bad}</span></td>
                                                    <td><a href={'#book/' + hero.book_id}>View book</a></td>
                                                    <td>
                                                        {hero.image === null && <span>No image</span>}
                                                        {hero.image && <img src={SERVER_URL + '/' + hero.image} alt={hero.name} style={{ maxWidth: '200px' }} className="img-thumbnail" />}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" onClick={e => go(e, 'prev')} href="/">Previous</a></li>
                                    <li className="page-item"><a className="page-link" onClick={e => go(e, '1')} href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" onClick={e => go(e, '2')} href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" onClick={e => go(e, '3')} href="/">3</a></li>
                                    <li className="page-item"><a className="page-link" onClick={e => go(e, 'next')} href="/">Next</a></li>
                                </ul>
                            </nav>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
