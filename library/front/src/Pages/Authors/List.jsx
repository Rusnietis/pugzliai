import { useContext } from 'react';
import { Authors } from '../../Contexts/Authors';

export default function List() {

    const { authors } = useContext(Authors);

    console.log(authors)

    return (
        <div className="card mt-4 ">
            <div className="card-header">
                <h3>List of Author</h3>
            </div>
            <div className="card-body">
                {
                    authors.map((author, index) => (
                        <div key={index} className="card mt-2">
                            <div className="card-body">
                                <h5>{author.name}</h5>
                                </div>
                                </div>
                    ))
                }

            
            </div>
            <div className="card-footer">

            </div>
        </div>
    )
}
