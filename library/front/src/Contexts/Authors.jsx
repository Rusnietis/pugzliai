import { createContext, useReducer, useState } from 'react';
import useAuthors from '../Hooks/useAuthors';
import authorsReducer from '../Reducers/authorsReducer';

export const Authors = createContext();

export const AuthorsProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [authors, dispatchAuthors] = useReducer(authorsReducer, []);
    const [deleteAuthor, setDeleteAuthor] = useState(null);
    const [editAuthor, setEditAuthor] = useState(null);

    //console.log(authors)

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeAuthor, setStoreAuthor, updateAuthor, setUpdateAuthor, destroyAuthor, setDestroyAuthor } = useAuthors(dispatchAuthors);



    return (
        <Authors.Provider value={{
            authors,
            dispatchAuthors,
            storeAuthor,
            setStoreAuthor,
            updateAuthor,
            setUpdateAuthor,
            destroyAuthor,
            setDestroyAuthor,
            deleteAuthor, 
            setDeleteAuthor,
            editAuthor, 
            setEditAuthor

        }}>
            {children}
        </Authors.Provider>
    );
}