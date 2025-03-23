import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import { getAuthors, storeAuthorAsTemp, storeAuthorAsReal, deleteAuthorAsTemp, deleteAuthorAsReal } from '../Actions/authors';


//patikrinta
export default function useAuthors(dispatchAuthors) {

    const [storeAuthor, setstoreAuthor] = useState(null);
    const [updateAuthor, setUpdateAuthor] = useState(null);
    const [destroyAuthor, setDestroyAuthor] = useState(null);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/authors`)
            .then(res => {
                console.log(res.data)
                dispatchAuthors(getAuthors(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, [destroyAuthor]);


    useEffect(_ => {
        if (null !== storeAuthor) {
            const uuid = uuidv4();
            dispatchAuthors(storeAuthorAsTemp({ ...storeAuthor, id: uuid }));
            axios.post(`${SERVER_URL}/authors`, { ...storeAuthor, id: uuid })
                .then(res => {
                    setstoreAuthor(null);
                    dispatchAuthors(storeAuthorAsReal(res.data))
                })
                .catch(err => {
                    setstoreAuthor(null);
                });
        }
    }, [storeAuthor]);

    useEffect(_ => {
        if (null !== destroyAuthor) {

            dispatchAuthors(deleteAuthorAsTemp(destroyAuthor));

            axios.delete(`${SERVER_URL}/authors/${destroyAuthor.id}`)
                .then(res => {
                    setDestroyAuthor(null);
                    dispatchAuthors(deleteAuthorAsReal(res.data));
                })
                .catch(err => {
                    setDestroyAuthor(null);
                })
        }
    }, [destroyAuthor])

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