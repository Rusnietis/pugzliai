import { useContext, useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import useGet from '../../Hooks/useGet';
import { Router } from '../../Contexts/Router';
import * as icon from '../../Icons'
import { SERVER_URL } from '../../Constants/main';


export default function Index() {

    const { params } = useContext(Router);

    const { data, loading } = useGet('/book/' + params[0] || '');

    const heroes = data => {
        const h = [];
        data.forEach(item => {
            h.push({ id: item.hero_id, name: item.hero, good: item.good, image: item.image, url: item.heroUrl });
        });
        return h;
    }


    const book = data === null
        ?
        {}
        :
        {
            id: data[0].id,
            title: data[0].title,
            genre: data[0].genre,
            pages: data[0].pages,
            name: data[0].name,
            surname: data[0].surname,
            heroes: heroes(data)
        }




    if (loading) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <div className="container text-center">
                <div className="row">
                    <div className="col-4 mt-4">
                        <h1>Book</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="col-3">
                                    <h3>
                                        <span>{book.title}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <p><strong>Author:</strong> {book.name} {book.surname}</p>
                                        <p><strong>Genre:</strong> {book.genre}</p>
                                        <p><strong>Pages:</strong> {book.pages}</p>
                                    </div>
                                    <div className="col-8">
                                        <h5>Heroes</h5>
                                        <ul>
                                            {book.heroes.map(hero => (
                                                <li key={hero.id}>
                                                    {hero.image === null && <span>No image</span>}
                                                    {hero.image && <img src={SERVER_URL + '/' + hero.image} alt={hero.name} style={{ maxWidth: '200px' }} className="img-thumbnail" />}
                                                    <p>{hero.name}</p>
                                                    <span className={'icon ' + (hero.good ? 'good' : 'bad')}>{hero.good ? icon.good : icon.bad}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
