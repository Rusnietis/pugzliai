import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import useGet from '../../Hooks/useGet';

import * as icon from '../../Icons'
import { SERVER_URL } from '../../Constants/main';


export default function Index() {

    const { data, loading, setUrl } = useGet('/heroes-list');


    const go = (e, page) => {
        e.preventDefault();
        if (page === 'prev'){
            page = data.page - 1;
            page = Math.max(1,page);
        }
        if (page === 'next'){
            page = data.page + 1;
            page = Math.min(data.totalPages, page);
        }

        setUrl('/heroes-list?page=' + page)
    }

    //const pages = Array.from({ length: data.totalPages }, (v, k) => k + 1);

    const getPages = _ => {
        const showPaginators = 3;
        const activePage = data.page;
        const pages = [];
        let start = activePage - showPaginators;
        let end = activePage + showPaginators;
        for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= data.totalPages) {
                pages.push(i);
            }
        }
        return pages;
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
                            <nav className="paginator">
                                <ul className="pagination">
                                    {
                                        data.page === 1 || <li className="page-item prev"><a className="page-link" onClick={e => go(e, 1)} href="/">{icon.last}</a></li>
                                    }
                                    {
                                        data.page === 1 || <li className="page-item prev"><a className="page-link" onClick={e => go(e, 'prev')} href="/">{icon.next}</a></li>
                                    }
                                    {
                                        getPages().map(page => {
                                            return (
                                                <li key={page} className={'page-item' + (data.page === page ? ' active' : '')}>
                                                    {
                                                        data.page === page && <span className="page-link">{page}</span>
                                                    }
                                                    {
                                                        data.page === page || <a className="page-link" onClick={e => go(e, page)} href="/">{page}</a>
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                    {
                                        data.page === data.totalPages || <li className="page-item next"><a className="page-link" onClick={e => go(e, 'next')} href="/">{icon.next}</a></li>
                                    }
                                    {
                                        data.page === data.totalPages || <li className="page-item next"><a className="page-link" onClick={e => go(e, data.totalPages)} href="/">{icon.last}</a></li>
                                    }                                   
                                </ul>
                                <div className="pages-info">
                                    Page {data.page} of {data.totalPages}
                                </div>
                            </nav>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
