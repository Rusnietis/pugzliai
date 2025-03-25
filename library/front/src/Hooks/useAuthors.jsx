import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/authors';


//patikrinta
export default function useAuthors(dispatchAuthors) {

    const [storeAuthor, setstoreAuthor] = useState(null);
    const [updateAuthor, setUpdateAuthor] = useState(null);
    const [destroyAuthor, setDestroyAuthor] = useState(null);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/authors`)
            .then(res => {
                console.log(res.data)
                dispatchAuthors(a.getAuthors(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, [destroyAuthor, dispatchAuthors]);


    useEffect(_ => {
        if (null !== storeAuthor) {
            const uuid = uuidv4();
            dispatchAuthors(a.storeAuthorAsTemp({ ...storeAuthor, id: uuid }));
            axios.post(`${SERVER_URL}/authors`, { ...storeAuthor, id: uuid })
                .then(res => {
                    setstoreAuthor(null);
                    dispatchAuthors(a.storeAuthorAsReal(res.data))
                })
                .catch(err => {
                    dispatchAuthors(a.storeAuthorAsUndo({ ...storeAuthor, id: uuid }));
                    setstoreAuthor(null);
                });
        }
    }, [storeAuthor, dispatchAuthors]);

    useEffect(_ => {
        if (null !== updateAuthor) {
            dispatchAuthors(a.updateAuthorAsTemp(updateAuthor));
            axios.put(`${SERVER_URL}/authors/${updateAuthor.id}`, updateAuthor)
                .then(res => {
                    setUpdateAuthor(null);
                    dispatchAuthors(a.updateAuthorAsReal(res.data));
                })
                .catch(err => {
                    setUpdateAuthor(null);
                    dispatchAuthors(a.updateAuthorAsUndo(updateAuthor));
                });

        }
    }, [updateAuthor, dispatchAuthors])

    useEffect(_ => {
        if (null !== destroyAuthor) {
            dispatchAuthors(a.deleteAuthorAsTemp(destroyAuthor));
            axios.delete(`${SERVER_URL}/authors/${destroyAuthor.id}`)
                .then(res => {
                    setDestroyAuthor(null);
                    dispatchAuthors(a.deleteAuthorAsReal(res.data));
                })
                .catch(err => {
                    dispatchAuthors(a.deleteAuthorAsUndo(destroyAuthor));
                    setDestroyAuthor(null);
                })
        }
    }, [destroyAuthor, dispatchAuthors]);

    // useEffect(_ => {
    //     if (null !== updateAuthor) {
    //         axios.put(`${SERVER_URL}/fruits/${updateAuthor.id}`, updateAuthor)
    //             .then(res => {
    //                 setUpdateAuthor(null);
    //                 console.log(res.data)
    //                 setAuthors(f => f.map(fruit => fruit.id === res.data.id ? {...fruit, temp: false} : fruit));
    //             })
    //             .catch(err => {
    //                console.log(err);
    //             });
    //     }
    // }, [updateAuthor]);






    return {

        storeAuthor,
        setstoreAuthor,
        updateAuthor,
        setUpdateAuthor,
        destroyAuthor,
        setDestroyAuthor
    };
}