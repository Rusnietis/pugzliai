import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/heroes';
import { MessagesContext } from '../Contexts/Messages';
import { Router } from '../Contexts/Router';
import { Auth } from '../Contexts/Auth';

//patikrinta
export default function useHeroes(dispatchHeroes) {

    const [storeHero, setStoreHero] = useState(null);
    const [updateHero, setUpdateHero] = useState(null);
    const [destroyHero, setDestroyHero] = useState(null);
    const { setUser} = useContext(Auth)
    const { addMessage } = useContext(MessagesContext);
    const { setErrorPageType } = useContext(Router)

    useEffect(_ => {
        axios.get(`${SERVER_URL}/heroes`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                dispatchHeroes(a.getHeroes(res.data));
            })
            .catch(err => {
                if (err?.response?.status === 401) {
                    if (err.response.data.type === 'login') {
                        window.localStorage.removeItem('user');
                        window.localStorage.removeItem('role');
                        window.localStorage.removeItem('id');
                        setUser(null);
                        window.location.href = '#login'
                    } else {
                        setErrorPageType(401)
                    }
                } else {
                    setErrorPageType(503)
                }
            })
    }, [dispatchHeroes, setErrorPageType, setUser])

    //store

    useEffect(_ => {
        if (null !== storeHero) {
            const uuid = uuidv4();
            dispatchHeroes(a.storeHeroAsTemp({ ...storeHero, id: uuid }));
            const toServer = { ...storeHero };
            delete toServer.author;
            delete toServer.book;
            axios.post(`${SERVER_URL}/heroes`, { ...toServer, id: uuid }, { withCredentials: true })
                .then(res => {
                    setStoreHero(null);
                    dispatchHeroes(a.storeHeroAsReal(res.data));
                    addMessage(res.data.message);
                })
                .catch(err => {
                    dispatchHeroes(a.storeHeroAsUndo({ ...storeHero, id: uuid }));
                    setStoreHero(null);
                });
        }
    }, [storeHero, dispatchHeroes, addMessage]);

    useEffect(_ => {
        if (null !== updateHero) {
            dispatchHeroes(a.updateHeroAsTemp(updateHero));
            const toServer = { ...updateHero };
            delete toServer.author;
            delete toServer.book;
            if (updateHero.image === updateHero.old.image) {
                toServer.image = null;
            }
            axios.put(`${SERVER_URL}/heroes/${updateHero.id}`, toServer, { withCredentials: true })
                .then(res => {
                    setUpdateHero(null);
                    dispatchHeroes(a.updateHeroAsReal(res.data));
                    addMessage(res.data.message);
                })
                .catch(err => {
                    setUpdateHero(null);
                    dispatchHeroes(a.updateHeroAsUndo(updateHero));
                });

        }
    }, [updateHero, dispatchHeroes, addMessage])

    //delete 

    useEffect(_ => {
        if (null !== destroyHero) {
            dispatchHeroes(a.deleteHeroAsTemp(destroyHero));
            axios.delete(`${SERVER_URL}/heroes/${destroyHero.id}`, { withCredentials: true })
                .then(res => {
                    setDestroyHero(null);
                    dispatchHeroes(a.deleteHeroAsReal(res.data));
                    addMessage(res.data.message);
                })
                .catch(err => {
                    dispatchHeroes(a.deleteHeroAsUndo(destroyHero));
                    setDestroyHero(null);
                })
        }
    }, [destroyHero, dispatchHeroes, addMessage]);

    return {

        storeHero,
        setStoreHero,
        updateHero,
        setUpdateHero,
        destroyHero,
        setDestroyHero
    };
}