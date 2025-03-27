import { useContext } from 'react';
import { Books } from '../../Contexts/Books';

export default function List() {

    const { books, setDeleteBook, setEditBook } = useContext(Books);

    //console.log(books)

    //console.log(books)

    return (
        <>
            {
                books.map(book => (
                    <div key={book.id}>
                        {
                            book.deleted
                                ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {book.title} has been deleted
                                </div>

                                :

                                <div className="card mt-2" style={{
                                    opacity: book.temp ? 0.5 : 1
                                }}>
                                    <div className="card-header">
                                        <h4>{book.title} {book.s}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p>Page: {book.pages}</p>
                                        <p>Genre: {book.genre}</p>
                                        <p>Author: {book?.author?.name} {book?.author?.surname}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"
                                            disabled={book.temp ? true : false}
                                            className="btn btn-danger"
                                            onClick={_ => setDeleteBook(book)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            disabled={book.temp ? true : false}
                                            className="btn btn-primary m-3"
                                            onClick={_ => setEditBook(book)}
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
