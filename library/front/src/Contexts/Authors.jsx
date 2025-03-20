import { createContext, useReducer } from 'react';
import useAuthors from '../Hooks/useAuthors';
import authorsReducer from '../Reducers/authorsReducer';

export const Authors = createContext();

export const AuthorsProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [authors, dispatchAuthors] = useReducer(authorsReducer, null);

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { createAuthor, setCreateAuthor, editAuthor, setEditAuthor, deleteAuthor, setDeleteAuthor } = useAuthors(dispatchAuthors);



    return (
        <Authors.Provider value={{
            authors,
            dispatchAuthors,
            createAuthor,
            setCreateAuthor,
            editAuthor,
            setEditAuthor,
            deleteAuthor,
            setDeleteAuthor

        }}>
            {children}
        </Authors.Provider>
    );
}