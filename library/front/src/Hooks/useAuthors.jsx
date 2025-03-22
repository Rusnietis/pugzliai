import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import { getAuthors, storeAuthorAsTemp, storeAuthorAsReal } from '../Actions/authors';


//patikrinta
export default function useAuthors(dispatchAuthors) {

    const [storeAuthor, setstoreAuthor] = useState(null);
    const [editAuthor, setEditAuthor] = useState(null);
    const [deleteAuthor, setDeleteAuthor] = useState(null);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/authors`)
            .then(res => {
                console.log(res.data)
                dispatchAuthors(getAuthors(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, [deleteAuthor]);


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

    // useEffect(_ => {
    //     if (null !== editAuthor) {
    //         axios.put(`${SERVER_URL}/fruits/${editAuthor.id}`, editAuthor)
    //             .then(res => {
    //                 setEditAuthor(null);
    //                 console.log(res.data)
    //                 setAuthors(f => f.map(fruit => fruit.id === res.data.id ? {...fruit, temp: false} : fruit));
    //             })
    //             .catch(err => {
    //                console.log(err);
    //             });
    //     }
    // }, [editAuthor]);






    return {

        storeAuthor,
        setstoreAuthor,
        editAuthor,
        setEditAuthor,
        deleteAuthor,
        setDeleteAuthor
    };
}