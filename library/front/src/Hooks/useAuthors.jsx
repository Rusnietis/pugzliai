import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/authors';
import { MessagesContext } from '../Contexts/Messages';
import { Router } from '../Contexts/Router';
import { Auth } from '../Contexts/Auth';


//patikrinta
export default function useAuthors(dispatchAuthors) {

    const [storeAuthor, setStoreAuthor] = useState(null);
    const [updateAuthor, setUpdateAuthor] = useState(null);
    const [destroyAuthor, setDestroyAuthor] = useState(null);
    const { setUser } = useContext(Auth);
    const { addMessage } = useContext(MessagesContext);
    const { setErrorPageType } = useContext(Router);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/authors`, { withCredentials: true })
            .then(res => {
                //console.log(res.data)
                dispatchAuthors(a.getAuthors(res.data));
            })
            .catch(err => {
                if (err?.response?.status === 401) {
                    if (err.response.data.type === 'login') {
                        window.localStorage.removeItem('user');
                        window.localStorage.removeItem('role');
                        window.localStorage.removeItem('id');
                        setUser(null);
                        window.location.href = '#login';
                    } else {
                        setErrorPageType(401)
                    }
                } else {
                    setErrorPageType(503)
                }
            })
    }, [dispatchAuthors, setErrorPageType, setUser]);


    useEffect(_ => {
        if (null !== storeAuthor) {
            const uuid = uuidv4();
            dispatchAuthors(a.storeAuthorAsTemp({ ...storeAuthor, id: uuid }));
            axios.post(`${SERVER_URL}/authors`, { ...storeAuthor, id: uuid }, { withCredentials: true })
                .then(res => {
                    setStoreAuthor(null);
                    dispatchAuthors(a.storeAuthorAsReal(res.data));
                    addMessage(res.data.message);
                })
                .catch(err => {
                    dispatchAuthors(a.storeAuthorAsUndo({ ...storeAuthor, id: uuid }));
                    setStoreAuthor(null);
                    err?.response?.data?.message && addMessage(err.response.data.message);
                });
        }
    }, [storeAuthor, dispatchAuthors, addMessage]);

    useEffect(_ => {
        if (null !== updateAuthor) {
            dispatchAuthors(a.updateAuthorAsTemp(updateAuthor));
            axios.put(`${SERVER_URL}/authors/${updateAuthor.id}`, updateAuthor, { withCredentials: true })
                .then(res => {
                    setUpdateAuthor(null);
                    dispatchAuthors(a.updateAuthorAsReal(res.data));
                    addMessage(res.data.message);
                })
                .catch(err => {
                    setUpdateAuthor(null);
                    dispatchAuthors(a.updateAuthorAsUndo(updateAuthor));
                    err?.response?.data?.message && addMessage(err.response.data.message);
                });

        }
    }, [updateAuthor, dispatchAuthors, addMessage])

    useEffect(_ => {
        if (null !== destroyAuthor) {
            dispatchAuthors(a.deleteAuthorAsTemp(destroyAuthor));
            axios.delete(`${SERVER_URL}/authors/${destroyAuthor.id}`, { withCredentials: true })
                .then(res => {
                    setDestroyAuthor(null);
                    dispatchAuthors(a.deleteAuthorAsReal(res.data));
                    addMessage(res.data.message);
                })
                .catch(err => {
                    dispatchAuthors(a.deleteAuthorAsUndo(destroyAuthor));
                    setDestroyAuthor(null);
                    err?.response?.data?.message && addMessage(err.response.data.message);
                })
        }
    }, [destroyAuthor, dispatchAuthors, addMessage]);

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
        setStoreAuthor,
        updateAuthor,
        setUpdateAuthor,
        destroyAuthor,
        setDestroyAuthor
    };
}