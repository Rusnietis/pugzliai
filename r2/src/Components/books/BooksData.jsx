import { createContext, useEffect, useState } from "react";
import axios from 'axios';

const BOOK_URL = 'https://in3.dev/knygos/';

export const BooksData = createContext();




export const BooksDataProvider = ({ children }) => {

    const [books, setBooks] = useState([]);


    useEffect(_ => {
        axios.get(BOOK_URL)
            .then(res => setBooks(res.data))

    }, [setBooks]);

    return (
        <BooksData.Provider value={{
            books
        }}>
            {children}
        </BooksData.Provider>
    )
}