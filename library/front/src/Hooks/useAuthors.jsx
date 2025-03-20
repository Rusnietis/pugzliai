import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { getAuthors } from '../Actions/authors';



export default function useAuthors(dispatchAuthors) {

    const [createAuthor, setCreateAuthor] = useState(null);
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
    }, [dispatchAuthors]);


    // useEffect(_ => {
    //     if (null !== createAuthor) {

    //         axios.post(`${SERVER_URL}/fruits`, createAuthor)
    //             .then(res => {
    //                 setCreateAuthor(null);
    //                 console.log(res.data);
    //                 setAuthors(f => f.map(fruit => fruit.id === res.data.uuid ? {...fruit, id: res.data.id, temp: false} : fruit));
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    // }, [createAuthor]);

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

        createAuthor,
        setCreateAuthor,
        editAuthor,
        setEditAuthor,
        deleteAuthor,
        setDeleteAuthor
    };
}