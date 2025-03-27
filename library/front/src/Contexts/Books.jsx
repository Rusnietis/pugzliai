import { createContext, useState, useReducer } from 'react';
import booksReducer from '../Reducers/booksReducer'
import  useBooks  from '../Hooks/useBooks'


export const Books = createContext();

export const BooksProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [books, dispatchBooks] = useReducer(booksReducer, []);
    const [deleteBook, setDeleteBook] = useState(null);
    const [editBook, setEditBook] = useState(null);

    //console.log(books)

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeBook, setStoreBook, updateBook, setUpdateBook, destroyBook, setDestroyBook } = useBooks(dispatchBooks);



    return (
        <Books.Provider value={{
            books,
            dispatchBooks,
            storeBook,
            setStoreBook,
            updateBook,
            setUpdateBook,
            destroyBook,
            setDestroyBook,
            deleteBook, 
            setDeleteBook,
            editBook, 
            setEditBook

        }}>
            {children}
        </Books.Provider>
    );
}