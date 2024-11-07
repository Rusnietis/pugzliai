import { createContext, useEffect, useState } from "react";
import axios from 'axios';

const BOOK_URL = 'https://in3.dev/knygos/';
const TYPES_URL = 'https://in3.dev/knygos/types/';

export const BooksData = createContext();




export const BooksDataProvider = ({ children }) => {

    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState(null);

    console.log(types);

    useEffect(_ => {
        axios.get(BOOK_URL)
            .then(res => setBooks(res.data))

    }, [setBooks]);

    useEffect(_ => {

        const localTypes = localStorage.getItem('types');
        if (localTypes) {
            setTypes(JSON.parse(localTypes));
            return;
        }

        axios.get(TYPES_URL)
            .then(res => {
                setTypes(res.data);
                localStorage.setItem('types', JSON.stringify(res.data));
            })
    }, [setTypes])

    return (
        <BooksData.Provider value={{
            books,
            types
        }}>
            {children}
        </BooksData.Provider>
    )
}