import { useContext } from 'react';
import { Heroes } from '../../Contexts/Heroes';

export default function List() {

    const { heroes, setDeleteHero, setEditHero } = useContext(Heroes);

    //console.log(heroes)

    //console.log(Heros)

    return (
        <>
            {
                heroes.map(hero => (
                    <div key={hero.id}>
                        {
                            hero.deleted
                                ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {hero.name} has been deleted
                                </div>

                                :

                                <div className="card mt-2" style={{
                                    opacity: hero.temp ? 0.5 : 1
                                }}>
                                    <div className="card-header">
                                        <h4>{hero.name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p>Hero is {hero.good ? 'Good': 'Bad'}</p>
                                        <p>Book: {hero?.book?.title}</p>
                                        <p>Author: {hero?.author?.name} {hero?.author?.surname}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"
                                            disabled={hero.temp ? true : false}
                                            className="btn btn-danger"
                                            onClick={_ => setDeleteHero(hero)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            disabled={hero.temp ? true : false}
                                            className="btn btn-primary m-3"
                                            onClick={_ => setEditHero(hero)}
                                        >
                                            Edit
                                        </button>

                                    </div>
                                </div>
                        }
                    </div>
                ))
            }
        </>
    )
}
