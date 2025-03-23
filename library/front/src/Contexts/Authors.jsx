import { createContext, useReducer, useState } from 'react';
import useAuthors from '../Hooks/useAuthors';
import authorsReducer from '../Reducers/authorsReducer';

export const Authors = createContext();

export const AuthorsProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [authors, dispatchAuthors] = useReducer(authorsReducer, []);
    const [deleteAuthor, setDeleteAuthor] = useState(null);

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeAuthor, setstoreAuthor, updateAuthor, setUpdateAuthor, destroyAuthor, setDestroyAuthor } = useAuthors(dispatchAuthors);



    return (
        <Authors.Provider value={{
            authors,
            dispatchAuthors,
            storeAuthor,
            setstoreAuthor,
            updateAuthor,
            setUpdateAuthor,
            destroyAuthor,
            setDestroyAuthor,
            deleteAuthor, 
            setDeleteAuthor

        }}>
            {children}
        </Authors.Provider>
    );
}