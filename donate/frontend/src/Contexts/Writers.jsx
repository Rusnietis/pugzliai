import { createContext, useReducer, useState, useContext } from 'react';
import { Stories } from './Stories';
import useWriters from '../Hooks/useWriters';
import writersReducer from '../Reducers/writersReducer';

export const Writers = createContext();

export const WritersProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [writers, dispatchWriters] = useReducer(writersReducer, null);
    const [deleteWriter, setDeleteWriter] = useState(null);
    const [editWriter, setEditWriter] = useState(null);

    console.log('writers', writers)
    const { dispatchStories } = useContext(Stories);
    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeWriter, setStoreWriter, updateWriter, setUpdateWriter, destroyWriter, setDestroyWriter } = useWriters(dispatchWriters, dispatchStories);



    return (
        <Writers.Provider value={{
            writers,
            dispatchWriters,
            storeWriter,
            setStoreWriter,
            updateWriter,
            setUpdateWriter,
            destroyWriter,
            setDestroyWriter,
            deleteWriter,
            setDeleteWriter,
            editWriter,
            setEditWriter

        }}>
            {children}
        </Writers.Provider>
    );
}