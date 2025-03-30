import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/heroes';


//patikrinta
export default function useHeroes(dispatchHeroes) {

    const [storeHero, setStoreHero] = useState(null);
    const [updateHero, setUpdateHero] = useState(null);
    const [destroyHero, setDestroyHero] = useState(null);


    useEffect(_ => {
        axios.get(`${SERVER_URL}/heroes`)
            .then(res => {
                console.log(res.data);
                dispatchHeroes(a.getHeroes(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, [dispatchHeroes])

    //store

    useEffect(_ => {
        if (null !== storeHero) {
            const uuid = uuidv4();
            dispatchHeroes(a.storeHeroAsTemp({ ...storeHero, id: uuid }));
            const withOutHero = { ...storeHero };
            delete withOutHero.author;
            delete withOutHero.book;
            axios.post(`${SERVER_URL}/heroes`, { ...withOutHero, id: uuid })
                .then(res => {
                    setStoreHero(null);
                    dispatchHeroes(a.storeHeroAsReal(res.data))
                })
                .catch(err => {
                    dispatchHeroes(a.storeHeroAsUndo({ ...storeHero, id: uuid }));
                    setStoreHero(null);
                });
        }
    }, [storeHero, dispatchHeroes]);

    useEffect(_ => {
        if (null !== updateHero) {
            dispatchHeroes(a.updateHeroAsTemp(updateHero));
            const withOutAuthor = {...updateHero};
            delete withOutAuthor.author;
            axios.put(`${SERVER_URL}/heroes/${updateHero.id}`, withOutAuthor)
                .then(res => {
                    setUpdateHero(null);
                    dispatchHeroes(a.updateHeroAsReal(res.data));
                })
                .catch(err => {
                    setUpdateHero(null);
                    dispatchHeroes(a.updateHeroAsUndo(updateHero));
                });

        }
    }, [updateHero, dispatchHeroes])

    //delete 

    useEffect(_ => {
        if (null !== destroyHero) {
            dispatchHeroes(a.deleteHeroAsTemp(destroyHero));
            axios.delete(`${SERVER_URL}/heroes/${destroyHero.id}`)
                .then(res => {
                    setDestroyHero(null);
                    dispatchHeroes(a.deleteHeroAsReal(res.data));
                })
                .catch(err => {
                    dispatchHeroes(a.deleteHeroAsUndo(destroyHero));
                    setDestroyHero(null);
                })
        }
    }, [destroyHero, dispatchHeroes]);

    return {

        storeHero,
        setStoreHero,
        updateHero,
        setUpdateHero,
        destroyHero,
        setDestroyHero
    };
}